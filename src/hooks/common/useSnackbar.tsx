import { useEffect, useState } from "react";
import { SnackbarKey, useSnackbar } from "notistack";
import { ISnackbar } from "../../models/snackbar";
import styles_app from "../../styles/modules/app.module.scss";

const useSnackBar = () => {
  const defaultVariant = "success";
  const [snackbar, setSnackbar] = useState<ISnackbar>({
    message: "",
    variant: defaultVariant,
  });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const action = (key: SnackbarKey) => {
    const closeBar = () => {
      closeSnackbar(key);
    };
    return (
      <>
        <span className={styles_app.closeBtn} onClick={closeBar}>
          &times;
        </span>
      </>
    );
  };

  const handleShowSnackbar = (state: ISnackbar) => {
    setSnackbar({ ...state, variant: state?.variant || defaultVariant });
  };

  useEffect(() => {
    const { message, variant } = snackbar;
    if (message) {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 3000,
        action,
      });
    }
  }, [snackbar.message]);

  return { showSnackbar: handleShowSnackbar };
};

export default useSnackBar;
