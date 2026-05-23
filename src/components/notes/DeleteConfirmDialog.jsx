import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function DeleteConfirmDialog({
  open,
  note,
  onConfirm,
  onCancel,
}) {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="xs">
      <DialogTitle
        sx={{
          fontWeight: 600,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Confirmar eliminación
      </DialogTitle>
      <DialogContent sx={{ pt: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 500, mb: 1.5 }}>
          ¿Desea descartar esta nota?
        </Typography>
        <Box
          sx={{
            p: 1.5,
            backgroundColor: "action.hover",
            borderRadius: 1,
            borderLeft: "4px solid",
            borderColor: "error.main",
            mb: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
            {note?.title}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.disabled" display="block">
          Esta acción será permanente.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onCancel} color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
