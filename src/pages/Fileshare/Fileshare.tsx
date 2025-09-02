import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { useLocation } from "react-router-dom";

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
} from './FileShare.styles';

const FILES_PER_ROW = 5;
const ROWS = 2;
const FILES_PER_PAGE = ROWS * FILES_PER_ROW;
const MAX_FILE_SIZE = 150 * 1024 * 1024;
export const MAX_FILE_SIZE_MB = 150;

enum FileTypeEnum {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  PDF = 'pdf',
  OTHER = 'other'
};

interface FileData {
  name: string;
  file_type: string;
  url: string;
  special: boolean;
  created: string;
}

function determineFileType(fileType: String): FileTypeEnum {
  if (fileType.match(/(png|jpg|jpeg|gif|webp|ico)$/i)) {
    return FileTypeEnum.IMAGE;
  } else if (fileType.match(/(mp4|webm|ogg|mkv)$/i)) {
    return FileTypeEnum.VIDEO;
  } else if (fileType.match(/(mp3)$/i)) {
    return FileTypeEnum.AUDIO;
  } else if (fileType.match(/(pdf)$/i)) {
    return FileTypeEnum.PDF;
  } else {
    return FileTypeEnum.OTHER;
  }
}

function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(() => {
    const stored = sessionStorage.getItem(key);
    return stored !== null ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

const ErrorPopup = ({ error, onClose }: { error: string | null, onClose: () => void }) => (
  error ? (
    <UploadErrorPopup>
      <strong>Upload Error:</strong> {error}
      <button onClick={onClose} style={{ marginLeft: '1rem' }}>Close</button>
    </UploadErrorPopup>
  ) : null
);

const PaginationBar = ({
  count,
  page,
  onChange,
  siblings,
  ...props
}: {
  count: number;
  page: number;
  onChange: (event: unknown, page: number) => void;
  siblings: number;
  $bar?: boolean;
  $top?: boolean;
}) => (
  <StyledStack spacing={1} {...props}>
    <StyledPagination count={count} page={page} onChange={onChange} siblingCount={siblings} variant="outlined" shape="rounded" />
  </StyledStack>
);

const FilesGridCards = ({
  files,
  showNSFW,
  determineFileType
}: {
  files: FileData[];
  showNSFW: boolean;
  determineFileType: (fileType: string) => FileTypeEnum;
}) => (
  <FilesGrid>
    {files.map((file, index) => {
      const isBlurred = file.special && !showNSFW;
      const type = determineFileType(file.file_type);

      switch (type) {
        case FileTypeEnum.VIDEO:
          return (
            <FileCard key={file.name}>
              <VideoBox $blur={isBlurred} controls>
                <VideoSource src={file.url} />
                Your browser does not support the video tag.
              </VideoBox>
            </FileCard>
          );
        case FileTypeEnum.IMAGE:
          return (
            <FileCard key={index} href={file.url} rel="noopener noreferrer">
              <ImageSource src={file.url} alt={file.url} $blur={isBlurred} />
            </FileCard>
          );
        case FileTypeEnum.AUDIO:
          return (
            <FileCard key={file.name + '.' + file.file_type}>
              <AudioBox controls src={file.url}>
                Your browser does not support the audio element.
              </AudioBox>
            </FileCard>
          );
        case FileTypeEnum.PDF:
          return (
            <FileCard key={index}>
              <iframe src={file.url} width="100%" height="100%" title={file.name} />
            </FileCard>
          );
        default:
          return (
            <FileCard key={index} href={file.url} rel="noopener noreferrer">
              {file.name + "." + file.file_type}
            </FileCard>
          );
        }
      }
    )}
  </FilesGrid>
);

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
  handleFileChange,
  count
}: {
  page: number;
  handlePageChange: (event: unknown, page: number) => void;
  search: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showNSFW: boolean;
  handleShowNsfwChange: (e: ChangeEvent<HTMLInputElement>) => void;
  uploadNSFW: boolean;
  handleUploadNsfwChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUploadClick: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  count: number;
}) => (
  <ControlBar>
    <PaginationBar
      count={count}
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
  </ControlBar>
);

const FileShare = () => {
  useEffect(() => {
    document.title = "Fileshare Is Me";
  }, []);

  const [files, setFiles] = useState<FileData[]>([]);
  const [total_files, setTotalFiles] = useState<number>(0);
  const [page, setPage] = usePersistentState<number>('currentPage', 1);
  const [search, setSearch] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showNSFW, setShowNsfwChecked] = usePersistentState<boolean>('showNSFW', false);
  const [uploadNSFW, setUploadNsfwChecked] = useState<boolean>(false);
  const [refreshFiles, setRefreshFiles] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const maxPage = Math.ceil(total_files / FILES_PER_PAGE);

  const handleShowNsfwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowNsfwChecked(e.target.checked);
  };

  const handleUploadNsfwChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUploadNsfwChecked(e.target.checked);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handlePageChange = (_event: unknown, pageNum: number) => {
    setPage(pageNum);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filesList = e.target.files;
    if (!filesList || !filesList.length) return;
    const formData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      if (filesList[i]!.size > MAX_FILE_SIZE) {
        setUploadError(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      formData.append('files[]', filesList[i]!);
    }
    formData.append('nsfw', uploadNSFW ? '1' : '0');

    fetch('/php-api/uploadFiles.php', {
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
      .then(() => {
        setRefreshFiles(r => !r);
        setUploadError(null);
      })
      .catch(err => {
        setUploadError(err.message || 'Unknown error');
      });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  useEffect(() => {
    const start = (page - 1) * FILES_PER_PAGE;
    let apiCall = `/php-api/getFilesAndCount.php?start=${start}&size=${FILES_PER_PAGE}`;
    if (search) {
      apiCall += `&search=${encodeURIComponent(search)}`;
    }
    fetch(apiCall, {
      headers: {
        'X-Frontend-Host': window.location.host
      }
    })
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
      });
  }, [page, search, refreshFiles]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <>
      <ErrorPopup error={uploadError} onClose={() => setUploadError(null)} />
      <ControlBarSection
        count={maxPage}
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

export default FileShare;