import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearItems } from "../features/selectedItemsSlice";
import { RootState } from "../app/store";

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.items
  );

  const handleDownload = () => {
    const csvContent = selectedItems.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedItems.length}_items.csv`;
    link.click();
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <p>{selectedItems.length} items selected</p>
      <button onClick={() => dispatch(clearItems())}>Unselect All</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
