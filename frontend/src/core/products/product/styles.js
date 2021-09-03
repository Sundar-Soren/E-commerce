import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },

  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
