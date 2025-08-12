import { useState } from 'react';

import { 
  FilesGrid, 
  FileCard, 
  ImageSource,
  ControlBar,
  VideoBox,
  VideoSource,
  StyledStack,
  StyledPagination
} from './Memes.styles'

const FILE_DIRECTORY = "/collection/";

const FileType = {
  IMAGE: 'image',
  VIDEO: 'video'
};

const allFiles = [
  { name: "Luigi brother.png", type: FileType.IMAGE },
  { name: "mario-brother.png", type: FileType.IMAGE },
  { name: "bowser.mp4", type: FileType.VIDEO },
  { name: "princess_DAISY.png", type: FileType.IMAGE },
  { name: "princess.peach.webp", type: FileType.IMAGE },
  { name: "waluigi.gif", type: FileType.IMAGE },
  { name: "wario(w).jpg", type: FileType.IMAGE },
  { name: "Luigi brother.png", type: FileType.IMAGE },
  { name: "mario-brother.png", type: FileType.IMAGE },
  { name: "bowser.mp4", type: FileType.VIDEO },
  { name: "princess_DAISY.png", type: FileType.IMAGE },
  { name: "princess.peach.webp", type: FileType.IMAGE },
  { name: "waluigi.gif", type: FileType.IMAGE },
  { name: "wario(w).jpg", type: FileType.IMAGE },
]

const filesWithPath = (files) => files.map(file => ({
  ...file,
  path: FILE_DIRECTORY + file.name
}));

const filesGridCards = (files) =>
  filesWithPath(files).slice(0,10).map((file, index) => {
    if (file.type === FileType.VIDEO) {
      return (
        <FileCard key={index}>
          <VideoBox controls>
            <VideoSource src={file.path} />
            Your browser does not support the video tag.
          </VideoBox>
        </FileCard>
      );
    } else if (file.type === FileType.IMAGE) {
      return (
        <FileCard key={index} href={file.path}>
          <ImageSource src={file.path} alt={file.name} />
        </FileCard>
      );
    } else {
      return <FileCard key={index} href={file.path} />;
    }
});

const Memes = () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value); // 'value' is the selected page number
  };

  const pagination = () => (
    <StyledStack spacing={2}>
      <StyledPagination count={10} page={page} onChange={handlePageChange} />
    </StyledStack>);

  return (
    <>
      <ControlBar></ControlBar>
      {pagination()}
      <FilesGrid>
        {filesGridCards(allFiles)}
      </FilesGrid>
      {pagination()}
    </>
  )
}

export default Memes