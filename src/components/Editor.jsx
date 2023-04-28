import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import MagicUrl from "quill-magic-url";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
Quill.register("modules/magicUrl", MagicUrl);

export default function Editor({ onChange, value }) {
  const [openMenu, setOpenMenu] = React.useState(null);
  const quillRef = React.useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range && range.length > 0) {
      // Calculate the position of the popup based on the selection
      const { clientX, clientY } = e;
      setOpenMenu({
        left: clientX,
        top: clientY,
      });
    }
  };
  const handleFormat = (format) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    if (range && range.length > 0) {
      const formats = quill.getFormat(range);
      if (formats[format]) {
        quill.formatText(range.index, range.length, format, false);
      } else {
        quill.formatText(range.index, range.length, format, true);
      }
    }
    setOpenMenu(null);
  };
  return (
    <div style={{ minHeight: "500px" }}>
      <div
        style={{ display: "flex", alignItems: "center" }}
        onContextMenu={handleClick}
      >
        <ReactQuill
          ref={quillRef}
          value={value}
          modules={{ magicUrl: true }}
          style={{ minHeight: "300px", width: "100%" }}
          onChangeSelection={(range, source, editor) => {
            if (range?.length === 0 || source !== "user") return;
          }}
          theme="snow"
          onChange={onChange}
          placeholder="Your content goes here"
        />
        <Menu
          open={openMenu !== null}
          onClose={() => setOpenMenu(null)}
          anchorReference="anchorPosition"
          anchorPosition={
            openMenu !== null
              ? { top: openMenu.top, left: openMenu.left }
              : undefined
          }
        >
          <MenuItem onClick={() => handleFormat("bold")}>
            <span className="font-bold">Bold</span>
          </MenuItem>
          <MenuItem onClick={() => handleFormat("italic")}>
            {" "}
            <span className="italic">Italic</span>
          </MenuItem>
          <MenuItem onClick={() => handleFormat("underline")}>
            <span className="underline">Underline</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
