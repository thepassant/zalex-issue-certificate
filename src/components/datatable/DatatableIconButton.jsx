import Tooltip from "../Tooltip";

const DatatableIconButton = ({
  disabled,
  hidden,
  icon,
  onClick,
  rowData,
  tooltipContent,
  tooltipPosition = "bottom",
}) => {
  const disabledBtn = disabled
    ? typeof disabled === "boolean"
      ? disabled
      : disabled(rowData)
    : undefined;

  return (
    <>
      {!(hidden
        ? typeof hidden === "boolean"
          ? hidden
          : hidden(rowData)
        : undefined) && (
        <Tooltip
          tooltipContent={tooltipContent}
          disabled={disabledBtn}
          position={tooltipPosition}
        >
          <button
            disabled={disabledBtn}
            onClick={(e) => onClick(e, rowData)}
            className="datatable-icon-button"
          >
            {icon}
          </button>
        </Tooltip>
      )}
    </>
  );
};

export default DatatableIconButton;
