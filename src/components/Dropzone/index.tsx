import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import classes from "./Dropzone.module.css";
import { List, ListItem, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

interface FilesListProps {
  setFilesList: (file: File) => void;
}

const Dropzone: React.FC<FilesListProps> = ({ setFilesList }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      setFilesList(acceptedFiles);
    },
    [setFilesList]
  );
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      onDrop,
      maxFiles: 4,
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem
      key={file.name}
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${file.name} - ${file.size} bytes`} />
    </ListItem>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <ListItem
        key={file.name}
        secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <FolderIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={`${file.name} - ${file.size} bytes`} />
        <List>
          {errors.map((e) => (
            <ListItem key={e.code}>
              <ListItemText primary={`${e.message}`} />
            </ListItem>
          ))}
        </List>
      </ListItem>
    );
  });

  return (
    <section className="container">
      <div className={classes.dropzone} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(4 files are the maximum number of files you can drop here)</em>
      </div>
      <aside>
        {acceptedFileItems.length === 0 ? null : (
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Accepted files
          </Typography>
        )}
        <List sx={{ width: "100%", maxWidth: 360 }}>{acceptedFileItems}</List>
        {fileRejectionItems.length === 0 ? null : (
          <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
            Rejected files
          </Typography>
        )}
        <List sx={{ width: "100%", maxWidth: 360 }}>{fileRejectionItems}</List>
      </aside>
    </section>
  );
};

export default Dropzone;