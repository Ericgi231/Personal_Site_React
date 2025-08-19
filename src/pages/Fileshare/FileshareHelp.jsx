import {
  HelpContainer, ApiCard, ApiHeader, Section, SectionTitle, SectionText,
  Table, TableRow, TableHeader, TableCell, ExampleBox
} from "./FileshareHelp.styles";
import { MAX_FILE_SIZE_MB } from './Fileshare';

const FileshareHelp = () => (
  <HelpContainer>
    <ApiCard>
      <ApiHeader>
        GET Files API <span style={{fontSize: "0.95rem", fontWeight: 400, marginLeft: "auto"}}>GET /api/getFilesAndCount.php</span>
      </ApiHeader>
      <Section>
        <SectionTitle>Description</SectionTitle>
        <SectionText>
          Retrieves a list of files from the database, with support for pagination, searching, and randomization.
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Query Parameters</SectionTitle>
        <SectionText>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Default</TableHeader>
                <TableHeader>Description</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              <TableRow>
                <TableCell>start</TableCell>
                <TableCell>int</TableCell>
                <TableCell>0</TableCell>
                <TableCell>The offset (number of files to skip). Used for pagination.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>size</TableCell>
                <TableCell>int</TableCell>
                <TableCell>10</TableCell>
                <TableCell>The number of files to return (max 10).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>random</TableCell>
                <TableCell>int</TableCell>
                <TableCell>0</TableCell>
                <TableCell>If set to 1, returns files in random order. Otherwise, returns newest first.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>search</TableCell>
                <TableCell>string</TableCell>
                <TableCell>null</TableCell>
                <TableCell>Search term. Returns files whose names (ignoring special characters) match.</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Example Requests</SectionTitle>
        <SectionText>
          <strong>Get the first 10 files:</strong>
          <ExampleBox>/api/getFilesAndCount.php</ExampleBox>
          <strong>Get files 20–29:</strong>
          <ExampleBox>/api/getFilesAndCount.php?start=20&amp;size=10</ExampleBox>
          <strong>Get 5 random files:</strong>
          <ExampleBox>/api/getFilesAndCount.php?size=5&amp;random=1</ExampleBox>
          <strong>Search for files with names like "onetwo":</strong>
          <ExampleBox>/api/getFilesAndCount.php?search=onetwo</ExampleBox>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Response Format</SectionTitle>
        <SectionText>
          Returns a JSON array.<br />
          The first element contains the total number of files (for pagination):
          <ExampleBox>
            {`{ "total_files": 123 }`}
          </ExampleBox>
          The rest are file objects:
          <ExampleBox>
            {`{
  "url": "https://ericgi231.me/collection/filename.ext",
  "special": 0,
  "name": "filename",
  "file_type": "ext",
  "created": "2025-08-19 12:34:56"
}`}
          </ExampleBox>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Error Responses</SectionTitle>
        <SectionText>
          <strong>405 Method Not Allowed:</strong> Only GET requests are allowed.<br />
          <strong>500 Server Error:</strong> An internal server error occurred.
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Notes</SectionTitle>
        <SectionText>
          <ul>
            <li><strong>size</strong> cannot be greater than 10.</li>
            <li><strong>search</strong> ignores special characters in file names.</li>
            <li>Results are ordered by newest first unless <strong>random=1</strong> is set.</li>
          </ul>
        </SectionText>
      </Section>
    </ApiCard>

    <ApiCard>
      <ApiHeader $post>
        Upload Files API <span style={{fontSize: "0.95rem", fontWeight: 400, marginLeft: "auto"}}>POST /api/uploadFiles.php</span>
      </ApiHeader>
      <Section>
        <SectionTitle>Description</SectionTitle>
        <SectionText>
          Upload one or more files to the server and add them to the database.
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Request Parameters</SectionTitle>
        <SectionText>
          <Table>
            <thead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Type</TableHeader>
                <TableHeader>Required</TableHeader>
                <TableHeader>Description</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              <TableRow>
                <TableCell>files</TableCell>
                <TableCell>file[]</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell>One or more files to upload (use multipart/form-data).</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>nsfw</TableCell>
                <TableCell>int</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Set to 1 to tag uploaded files as NSFW.</TableCell>
              </TableRow>
            </tbody>
          </Table>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Example Request (cURL)</SectionTitle>
        <SectionText>
          <ExampleBox>
            {`curl -X POST -F "files[]=@/path/to/file1.jpg" -F "files[]=@/path/to/file2.mp4" -F "nsfw=1" https://ericgi231.me/api/uploadFiles.php`}
          </ExampleBox>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Response Format</SectionTitle>
        <SectionText>
          On success, returns:
          <ExampleBox>
            {`{
  "results": [
    { "file": "file1.jpg", "status": "uploaded" },
    { "file": "file2.mp4", "status": "uploaded" }
  ]
}`}
          </ExampleBox>
          On error returns:
          <ExampleBox>
            {`{
  "status": "error",
  "message": "Error message here"
}`}
          </ExampleBox>
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Error Responses</SectionTitle>
        <SectionText>
          <strong>405 Method Not Allowed:</strong> Only POST requests are allowed.<br />
          <strong>409 Conflict:</strong> Duplicate file name.<br />
          <strong>413 Payload Too Large:</strong> File exceeds the maximum allowed size.<br />
          <strong>500 Server Error:</strong> An internal server error occurred.
        </SectionText>
      </Section>
      <Section>
        <SectionTitle>Notes</SectionTitle>
        <SectionText>
          <ul>
            <li>Maximum file size: {MAX_FILE_SIZE_MB}MB per file.</li>
            <li>Duplicate file names are not allowed.</li>
            <li>Files are stored in the <code>/collection/</code> directory.</li>
            <li>Set <code>nsfw=1</code> to mark files as NSFW.</li>
          </ul>
        </SectionText>
      </Section>
    </ApiCard>
  </HelpContainer>
);

// TODO: Make domain in examples dynamic

export default FileshareHelp;