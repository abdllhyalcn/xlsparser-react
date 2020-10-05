import React, { useEffect, useState } from 'react';
import './App.css';
import XlsDropZone from './components/XlsDropZone';
import Button from "@material-ui/core/Button"
import { downloadJSONReq, parseJSONReq, uploadExcel } from './utils/Requests';
import { Card} from '@material-ui/core';
import { DropEvent } from 'react-dropzone';
import FileResponse from './ReqModels/FileResponse';
import config from './config';

function App() {

  const [currFile, setCurrFile] = useState<File | undefined>(undefined);
  const [fileResponse, setFileResponse] = useState<FileResponse | undefined>();

  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [parseDisabled, setParseDisabled] = useState<boolean>(true);
  const [downDisabled, setDownDisabled] = useState<boolean>(true);

  const [dropFileName, setDropFileName] = useState<String | undefined>("");
  const [resultInfo, setResultInfo] = useState<String>("");


  useEffect(() => {
    if (currFile !== undefined) {
      setSubmitDisabled(false)
    }
    setDropFileName(currFile?.name)
  }, [currFile]);

  const onDropAccepted = (<T extends File>(files: T[], event: DropEvent) => {
    setCurrFile(files[0]);
  })

  const submitClick = async () => {
    if (currFile !== undefined) {
      const uploadResponse = uploadExcel(currFile);

      uploadResponse.then(response => {
        setFileResponse(response.data);
        setResultInfo(response.data.message);
        setParseDisabled(false);
        setDownDisabled(true);
      }).catch(error => {
        if (error.response && error.response.message) {
          setResultInfo(error.response.message);
        } else {
          setResultInfo(config.defaultError);
        }
        setFileResponse(undefined);
        setParseDisabled(true);
        setDownDisabled(true);
      })

    }

  }

  const parseClick = () => {
    if (fileResponse !== undefined) {
      const parseResponse = parseJSONReq(fileResponse.fileName);

      parseResponse.then(response => {
        setFileResponse(response.data);
        setResultInfo(response.data.message);
        setDownDisabled(false);
      }).catch(error => {
        if (error.response && error.response.message) {
          setResultInfo(error.response.message);
        } else {
          setResultInfo(config.defaultError);
        }
        setFileResponse(undefined);
        setDownDisabled(true);
      })
    }
  }

  const downloadClick = () => {
    if (fileResponse !== undefined) {
      const downResponse: String = downloadJSONReq(fileResponse.fileName)
      resetStates();
    }
  }

  const resetStates = () => {
    setCurrFile(undefined);
    setFileResponse(undefined);
    setSubmitDisabled(true);
    setParseDisabled(true);
    setDownDisabled(true);
    setDropFileName(undefined);
    setResultInfo("")
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>XLS Parser</h3>
      </header>
      <div className="App-body">

        <Card className="App-Card">
          <div className="upload-line">
            <h2>XLS File Upload</h2>
          </div>
          <div className="upload-line">
            <XlsDropZone
              maxSize={200000}
              onDropAccepted={onDropAccepted}></XlsDropZone>
          </div>
          <div className="upload-info">
            <label>{dropFileName}</label>
            <Button variant="contained" color="primary" onClick={submitClick} disabled={submitDisabled}>Submit</Button>
          </div>
          <label className="bold-label">{resultInfo}</label>
          <div className="footer-buttons">
            <Button variant="contained" color="primary" onClick={parseClick} disabled={parseDisabled}>Parse</Button>
            <Button variant="contained" color="primary" onClick={downloadClick} disabled={downDisabled}>Download</Button>
          </div>

        </Card>

      </div>


    </div >
  );
}

export default App;
