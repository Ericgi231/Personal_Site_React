import { useState, useEffect, useRef } from 'react';

import { 
  FilesGrid, 
  FileCard, 
  ImageSource,
  ControlBar,
  VideoBox,
  AudioBox,
  VideoSource,
  StyledStack,
  StyledPagination,
  FileUploadButton,
  HiddenFileInput,
  SearchInput,
  ControlBarDivider,
  ControlCheckbox
} from './Memes.styles'

// Constants
//
const FILES_PER_ROW = 5;
const ROWS = 2;
const FILES_PER_PAGE = ROWS * FILES_PER_ROW;
const FileType = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  PDF: 'pdf',
  OTHER: 'other'
};

// Helper Functions
//
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

// Persistent state hook
//
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

// Main Component
//
const Memes = () => {
  // State Management
  //
  const [files, setFiles] = useState([]);
  const [total_files, setTotalFiles] = useState([]);
  const [page, setPage] = usePersistentState('currentPage', 1);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);
  const [showNSFW, setShowNsfwChecked] = usePersistentState('showNSFW', false);
  const [uploadNSFW, setUploadNsfwChecked] = useState(false);
  const [refreshFiles, setRefreshFiles] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Event Handlers
  //
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

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > 150 * 1024 * 1024) { // 150MB limit
        setUploadError('File size exceeds 150MB limit');
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

  // Handle page changes
  const handlePageChange = (event, pageNum) => {
    setPage(pageNum);
  };

  // Fetch files from the server every time the page changes
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

  // Dynamic components
  //
  const controls = () => (
    <ControlBar>
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

  const pagination = (fileCount) => (
    <StyledStack spacing={2}>
      <StyledPagination count={Math.ceil(fileCount/FILES_PER_PAGE)} page={page} onChange={handlePageChange} />
    </StyledStack>);

  const filesGridCards = (files) =>
    files.map((file, index) => {
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
  });

  // Render Final Component
  //
  return (
    <>
      {uploadError && (
        <div style={{
          position: 'fixed',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          background: 'white',
          color: 'black',
          padding: '1rem 2rem',
          border: '2px solid red',
          borderRadius: '8px',
          zIndex: 1000
        }}>
          <strong>Upload Error:</strong> {uploadError}
          <button onClick={() => setUploadError(null)} style={{marginLeft: '1rem'}}>Close</button>
        </div>
      )}

      {controls()}
      {pagination(total_files)}
      <FilesGrid>
        {filesGridCards(files)}
      </FilesGrid>
      {pagination(total_files)}
    </>
  )
}

export default Memes