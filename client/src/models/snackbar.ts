import { SnackbarMessage, VariantType } from "notistack";

export interface ISnackbar {
  message: SnackbarMessage;
  variant?: VariantType;
}
