import useTouchScreenDetect from "../../customHooks/useTouchScreenDetect";
import MoveIcon from "../icons/MoveIcon";
import { getNestedValue, getTableDataCellWidth } from "../../constants/Helpers";

const DatatableBodyRow = ({ columns, row, actions }) => {
  const isHasTouch = useTouchScreenDetect();

  const onDragOverHandler = (e) => {
    e.preventDefault();
  };

  return (
    <tr
      onClick={
        row.onClick
          ? (e) => {
              row.onClick(e, row);
            }
          : undefined
      }
      onDoubleClick={
        row.onDoubleClick
          ? (e) => {
              row.onDoubleClick(e, row);
            }
          : undefined
      }
      onDragOver={row.isDroppable ? onDragOverHandler : undefined}
      onDrop={
        row.isDroppable && row.onDrop
          ? (e) => {
              row.onDrop(e, row);
            }
          : undefined
      }
      onDragStart={
        row.draggable && row.onDragStart
          ? (e) => {
              row.onDragStart(e, row);
            }
          : undefined
      }
      draggable={row.draggable}
      style={{ cursor: row.onClick ? "pointer" : "initial" }}
    >
      {columns.map((col, colIndex) => (
        <td
          style={{
            width: getTableDataCellWidth(
              col.width,
              col.field,
              columns,
              actions
            ),
          }}
          key={col.field}
          className={col.className ? col.className : ""}
        >
          <div
            className={`${
              colIndex === 0 && row.draggable && !isHasTouch
                ? "is-flex is-align-items-center"
                : ""
            }`}
          >
            {colIndex === 0 && row.draggable && !isHasTouch && (
              <MoveIcon className="move-element" />
            )}
            <div>
              {col.render
                ? col.render(row)
                : getNestedValue({ key: col.field, obj: row })}
            </div>
          </div>
        </td>
      ))}
    </tr>
  );
};
export default DatatableBodyRow;
