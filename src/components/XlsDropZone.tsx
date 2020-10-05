import React, { FunctionComponent } from "react"
import Dropzone, { DropEvent, DropzoneProps } from 'react-dropzone'
import GetAppIcon from '@material-ui/icons/GetApp';

interface XlsDropZoneProps extends DropzoneProps {
  maxSize: number,
  onDropAccepted: (<T extends File>(files: T[], event: DropEvent) => void) | undefined
}

const XlsDropZone: FunctionComponent<XlsDropZoneProps> = (props) => {

  return (
    <div style={{ padding: "30px", height: "50px", width: "300px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Dropzone
        onDropAccepted={props.onDropAccepted}
        maxSize={props.maxSize}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">

        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <div {...getRootProps()} style={{ display: "flex" }}>
            <GetAppIcon></GetAppIcon>
            <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload!'}
            {isDragActive && !isDragReject && "Drop it!"}
            {isDragReject && "File type not accepted, sorry!"}
          </div>
        )}
      </Dropzone>
    </div>
  )
}

export default XlsDropZone;