import {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import ClickAwayWrapper from "../ClickAwayWrapper";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import useDebounce from "../../customHooks/useDebounce";
import DropdownContextProvider from "./DropdownContextProvider";
import { getScrollParent, getElementOffset } from "../../constants/Helpers";

import Portal from "../Portal";
import { DropdownContext } from "../../contexts/Contexts";
import { maxMenuHeight } from "../../constants/Constants";

const DropdownComponent = ({ wrapper, header, body }) => {
  const {
      wrapperClassName = "",
      label,
      isParentFixed = false,
      targetParentId,
      controlledDropdown,
    } = wrapper ?? {},
    { isBorder = true, headerClassName = "", trigger } = header ?? {},
    { bodyClassName = "", options, customContent } = body ?? {},
    timeoutRef = useRef(null),
    [styles, setStyles] = useState({
      left: 0,
      top: 0,
    }),
    space = 10,
    [isDropdownOnTop, setIsDropdownOnTop] = useState(false),
    { isOpen, setOpen } = useContext(DropdownContext),
    dropdownWrapperRef = useRef(null),
    dropdownMenuRef = useRef(null),
    [menuWidth, setMenuWidth] = useState(undefined),
    [menuHeight, setMenuHeight] = useState(undefined),
    [showMenu, setShowMenu] = useState(false),
    [wrapperParentUpdated, setWrapperParentUpdated] = useState({
      top: 0,
      left: 0,
    });

  const toggleDropdown = () => {
    setOpen((prev) => !prev);
  };

  const onClickHandler = (value) => {
    controlledDropdown && controlledDropdown.onChangeHandler(value);
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen && menuWidth === undefined && menuHeight === undefined) {
      setMenuWidth(dropdownMenuRef.current?.offsetWidth);
      setMenuHeight(dropdownMenuRef.current?.offsetHeight);
    }
  }, [menuWidth, menuHeight, isOpen]);

  useEffect(() => {
    if (isOpen) {
      timeoutRef.current = setTimeout(() => {
        setShowMenu(true);
      }, 10);
    } else {
      setShowMenu(false);
    }
  }, [isOpen]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleScroll = useDebounce(
    useCallback(() => {
      if (dropdownWrapperRef.current) {
        const wrapper = dropdownWrapperRef.current.getBoundingClientRect(),
          windowHeight = window.innerHeight,
          menuBounding = dropdownMenuRef.current?.getBoundingClientRect();

        if (
          windowHeight - space <
            wrapper.top + wrapper.height + (menuBounding?.height || 0) &&
          wrapper.top + space > space * 2 + (menuBounding?.height || 0)
        )
          setIsDropdownOnTop(true);
        else setIsDropdownOnTop(false);
      }
    }, []),
    1
  );

  const getStylesList = useMemo(() => {
    if (dropdownWrapperRef.current && menuHeight && menuWidth && isOpen) {
      const wrapperRect = dropdownWrapperRef.current.getBoundingClientRect(),
        wrapperRef = dropdownWrapperRef.current,
        scrollableParent = targetParentId
          ? document.getElementById(targetParentId)
          : getScrollParent(wrapperRef),
        style = {
          //right
          left: Math.max(space, wrapperRect.right - wrapperRect.width),
          top:
            getElementOffset(dropdownWrapperRef.current).top +
            wrapperRect.height +
            space,
        };
      handleScroll();

      //not right
      if (!(style.left < menuWidth)) {
        style.left = Math.max(space, wrapperRect.right - menuWidth);
      }
      if (isDropdownOnTop && wrapperParentUpdated) {
        style.top =
          getElementOffset(dropdownWrapperRef.current).top - space - menuHeight;
      }
      if (!isParentFixed && scrollableParent) {
        style.top -= scrollableParent.scrollTop;
      }
      return style;
    }
    return {
      top: 0,
      left: 0,
    };
  }, [
    isDropdownOnTop,
    menuWidth,
    menuHeight,
    isOpen,
    wrapperParentUpdated,
    handleScroll,
    isParentFixed,
    targetParentId,
  ]);

  useEffect(() => {
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const updateStyles = useCallback(() => {
    setStyles(getStylesList);
  }, [getStylesList]);

  const updateScrollableParentScroll = ({ target }) => {
    setWrapperParentUpdated({ top: target.scrollTop, left: target.scrollLeft });
  };

  useEffect(() => {
    if (dropdownWrapperRef.current) {
      const wrapperRef = dropdownWrapperRef.current,
        scrollableParent = targetParentId
          ? document.getElementById(targetParentId)
          : getScrollParent(wrapperRef);
      updateStyles();

      window.addEventListener("resize", updateScrollableParentScroll);

      scrollableParent.addEventListener("scroll", updateScrollableParentScroll);

      return () => {
        window.removeEventListener("resize", updateScrollableParentScroll);

        scrollableParent.removeEventListener(
          "scroll",
          updateScrollableParentScroll
        );
      };
    }
  }, [updateStyles, targetParentId]);

  return (
    <ClickAwayWrapper
      onClickAwayCallback={() => {
        setOpen(false);
      }}
    >
      {label && <p className="label">{label}</p>}
      <div
        className={`dropdown-wrapper ${wrapperClassName} ${
          styles.left < menuWidth ? "is-right" : ""
        } ${!isBorder || trigger ? "no-border" : ""}`}
        ref={dropdownWrapperRef}
        style={{
          width:
            options?.find((el) => el.description) !== undefined
              ? "100%"
              : "auto",
        }}
      >
        <div
          className={`dropdown-header ${
            headerClassName ? headerClassName : ""
          }`}
          onClick={toggleDropdown}
        >
          {trigger ? (
            trigger
          ) : (
            <>
              <span className="selected-option">
                {controlledDropdown ? (
                  <>
                    {controlledDropdown.selectedOptionIcon && (
                      <span className="selected-option-icon">
                        {controlledDropdown.selectedOptionIcon}
                      </span>
                    )}
                    <span className="selected-option-label">
                      {options?.find(
                        (option) => option.value === controlledDropdown.value
                      )?.displayValue || ""}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>
              {controlledDropdown.arrowIcon ? (
                controlledDropdown.arrowIcon
              ) : (
                <ChevronDownIcon />
              )}
            </>
          )}
        </div>
        <Portal wrapperElement="span" wrapperElementId="dropdown">
          {isOpen && (
            <div className={`${styles.left < menuWidth ? "is-right" : ""}`}>
              <div
                className={`dropdown-body ${bodyClassName} ${
                  isDropdownOnTop ? "dropdown-on-top" : ""
                } ${isOpen && "open"}`}
                ref={dropdownMenuRef}
                style={{
                  ...styles,
                  maxHeight: customContent ? "unset" : maxMenuHeight,
                  overflowY:
                    menuHeight !== undefined &&
                    menuHeight >= maxMenuHeight &&
                    !customContent
                      ? "auto"
                      : "unset",
                  visibility: showMenu ? "visible" : "hidden",
                  width:
                    dropdownWrapperRef.current &&
                    options?.find((el) => el.description) !== undefined
                      ? dropdownWrapperRef.current.getBoundingClientRect().width
                      : "auto",
                }}
              >
                {customContent ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    {customContent}
                  </div>
                ) : (
                  options &&
                  options.map((option, i) => {
                    const optionClasses = `is-flex is-align-items-center ${
                      option.iconPosition === "right" ? "row-reverse" : ""
                    }`;

                    return (
                      <div
                        key={i}
                        className={`dropdown-item ${
                          !option.link ? optionClasses : ""
                        } ${option.className ? option.className : ""} ${
                          option.disabled ? "is-disabled" : ""
                        }`}
                        onClick={() => {
                          if (!option.disabled) {
                            onClickHandler(option.value);
                            option.onClickData &&
                              option.onClickData.onClick(
                                option.onClickData.data
                              );
                          }
                        }}
                        style={{ padding: option.link ? 0 : 10 }}
                      >
                        <ConditionalWrapper
                          initialWrapper={(children) => <>{children}</>}
                          condition={!!option.link}
                          wrapper={(children) => (
                            <Link
                              className={`is-fullwidth ${optionClasses}`}
                              to={option.link || ""}
                              style={{ padding: 10 }}
                            >
                              {children}
                            </Link>
                          )}
                        >
                          {option.icon && (
                            <span
                              className={`dropdown-item-icon ${
                                option.iconPosition === "right"
                                  ? "right-position"
                                  : "left-position"
                              }`}
                            >
                              {option.icon}
                            </span>
                          )}
                          <span className="is-flex is-flex-direction-column">
                            <span
                              className="dropdown-item-label"
                              style={{
                                fontWeight: option.description ? 600 : 400,
                              }}
                            >
                              {option.displayValue}
                            </span>
                            {option.description && (
                              <span className="dropdown-item-description">
                                {option.description}
                              </span>
                            )}
                          </span>
                        </ConditionalWrapper>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </Portal>
      </div>
    </ClickAwayWrapper>
  );
};

const Dropdown = (props) => (
  <DropdownContextProvider>
    <DropdownComponent {...props} />
  </DropdownContextProvider>
);

export default Dropdown;
