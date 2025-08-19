import { useState, useEffect, useRef } from 'react';

import { 
  AudioBox,
  ControlBar,
  ControlBarDivider,
  ControlCheckbox,
  FileCard,
  FileUploadButton,
  FilesGrid,
  HiddenFileInput,
  ImageSource,
  SearchInput,
  StyledPagination,
  StyledStack,
  UploadErrorPopup,
  VideoBox,
  VideoSource
} from './Fileshare.styles'

const FILES_PER_ROW = 5;
const ROWS = 2;
const FILES_PER_PAGE = ROWS * FILES_PER_ROW;
const MAX_FILE_SIZE = 150 * 1024 * 1024;
export const MAX_FILE_SIZE_MB = 150;
const FileType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  PDF: 'pdf',
  OTHER: 'other'
};

function determineFileType(fileType) {
  if (fileType.match(/(png|jpg|jpeg|gif|webp|ico)$/i)) {
    return FileType.IMAGE;
  } else if (fileType.match(/(mp4|webm|ogg|mkv)$/i)) {
    return FileType.VIDEO;
  } else if (fileType.match(/(mp3)$/i)) {
    return FileType.AUDIO;
  } else if (fileType.match(/(pdf)$/i)) {
    return FileType.PDF;
  } else {
    return FileType.OTHER;
  }
}

function usePersistentState(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = sessionStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const Fileshare = () => {
  useEffect(() => {
    document.title = "Fileshare Is Me";
  }, []);

  const [files, setFiles] = useState([]);
  const [total_files, setTotalFiles] = useState([]);
  const [page, setPage] = usePersistentState('currentPage', 1);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);
  const [showNSFW, setShowNsfwChecked] = usePersistentState('showNSFW', false);
  const [uploadNSFW, setUploadNsfwChecked] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const maxPage = Math.ceil(total_files / FILES_PER_PAGE);

  const handleShowNsfwChange = (e) => {
    setShowNsfwChecked(e.target.checked);
  };

  const handleUploadNsfwChange = (e) => {
    setUploadNsfwChecked(e.target.checked);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handlePageChange = (event, pageNum) => {
    setPage(pageNum);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > MAX_FILE_SIZE) {
        setUploadError(`File size exceeds ${MAX_FILE_SIZE_MB} limit`);
        fileInputRef.current.value = '';
        return;
      }
      formData.append('files[]', files[i]);
    }
    formData.append('nsfw', uploadNSFW ? 1 : 0);

    fetch('/api/uploadFiles.php', {
      method: 'POST',
      body: formData,
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok || data.status === 'error') {
          throw new Error(data.message || 'Upload failed');
        }
        return data;
      })
      .then(data => {
        console.log('Upload response:', data);
        setRefreshFiles(r => !r);
        setUploadError(null); 
      })
      .catch(err => {
        setUploadError(err.message || 'Unknown error');
        console.error('Upload error:', err);
      });
    fileInputRef.current.value = '';
  };

  useEffect(() => {
    const start = (page - 1) * FILES_PER_PAGE;
    var apiCall = `/api/getFilesAndCount.php?start=${start}&size=${FILES_PER_PAGE}`;
    if (search) {
      apiCall += `&search=${encodeURIComponent(search)}`;
    }
    fetch(apiCall, 
      {
        headers: {
          'X-Frontend-Host': window.location.host
        }
      }
    )
      .then(async res => {
        const data = await res.json();
        if (!res.ok || data.status === 'error') {
          throw new Error(data.message || 'Upload failed');
        }
        return data;
      })
      .then(data => {
        const [total, ...results] = data;
        setTotalFiles(total.total_files);
        setFiles(results);
        setUploadError(null); 
      })
      .catch(err => {
        setFiles([]);
        setUploadError(err.message || 'Unknown error');
        console.error('Error fetching files:', err);
      });
  }, [page, search, refreshFiles]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  const ErrorPopup = ({ error, onClose }) => (
    error && (
      <UploadErrorPopup>
        <strong>Upload Error:</strong> {error}
        <button onClick={onClose} style={{marginLeft: '1rem'}}>Close</button>
      </UploadErrorPopup>
    )
  );

  const PaginationBar = ({ count, page, onChange, siblings, ...props }) => (
    <StyledStack spacing={1} {...props}>
      <StyledPagination count={count} page={page} onChange={onChange} siblingCount={siblings} variant="outlined" shape="rounded"/>
    </StyledStack>
  );

  const FilesGridCards = ({ files, showNSFW, determineFileType }) => (
    <FilesGrid>
      {files.map((file, index) => {
        const type = determineFileType(file.file_type);
        if (type == FileType.VIDEO) {
          return (
            <FileCard key={file.name}>
              <VideoBox $blur={file.special & !showNSFW == true} controls >
                <VideoSource src={file.url} />
                Your browser does not support the video tag.
              </VideoBox>
            </FileCard>
          );
        } else if (type == FileType.IMAGE) {
          return (
            <FileCard key={index} href={file.url} rel="noopener noreferrer">
              <ImageSource src={file.url} alt={file.url} $blur={file.special & !showNSFW == true}/>
            </FileCard>
          );
        } else if (type == FileType.AUDIO) {
          return (
            <FileCard key={file.name + '.' + file.file_type}>
              <AudioBox controls src={file.url}>
                Your browser does not support the audio element.
              </AudioBox>
            </FileCard>
          );
        } else if (type == FileType.PDF) {
          return <FileCard key={index}><iframe src={file.url} width="100%" height="100%"/></FileCard>;
        } else {
          return <FileCard key={index} href={file.url} rel="noopener noreferrer">{file.name+"."+file.file_type}</FileCard>;
        }
      })}
    </FilesGrid>);

  const ControlBarSection = ({
      page,
      handlePageChange,
      search,
      handleSearchChange,
      showNSFW,
      handleShowNsfwChange,
      uploadNSFW,
      handleUploadNsfwChange,
      handleUploadClick,
      fileInputRef,
      handleFileChange
    }) => (
    <ControlBar>
      <PaginationBar
        count={maxPage}
        page={page}
        onChange={handlePageChange}
        siblings={2}
        $bar={true}
      />
      <SearchInput
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
      />
      <ControlCheckbox>
        <input
          type="checkbox"
          checked={showNSFW}
          onChange={handleShowNsfwChange}
        />
        Show NSFW
      </ControlCheckbox>
      <ControlBarDivider />
      <FileUploadButton type="button" onClick={handleUploadClick}>
        Upload File
      </FileUploadButton>
      <HiddenFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
      />
      <ControlCheckbox>
        <input
          type="checkbox"
          checked={uploadNSFW}
          onChange={handleUploadNsfwChange}
        />
        Tag NSFW
      </ControlCheckbox>
    </ControlBar>);

  return (
    <>
      <ErrorPopup error={uploadError} onClose={() => setUploadError(null)} />
      <ControlBarSection
        page={page}
        handlePageChange={handlePageChange}
        search={search}
        handleSearchChange={handleSearchChange}
        showNSFW={showNSFW}
        handleShowNsfwChange={handleShowNsfwChange}
        uploadNSFW={uploadNSFW}
        handleUploadNsfwChange={handleUploadNsfwChange}
        handleUploadClick={handleUploadClick}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <PaginationBar
        count={maxPage}
        page={page}
        onChange={handlePageChange}
        siblings={1}
        $top={true}
      />
      <FilesGridCards
        files={files}
        showNSFW={showNSFW}
        determineFileType={determineFileType}
      />
      <PaginationBar
        count={maxPage}
        page={page}
        onChange={handlePageChange}
        siblings={1}
      />
    </>
  )
}

export default Fileshare;