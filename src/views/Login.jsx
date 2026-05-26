import LoginForm from "../components/auth/LoginForm";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Login({ onSwitch }) {
  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            component="img"
            src="/minddrop-logo.png"
            alt="MindDrop"
            sx={{ width: 56, height: "auto", mb: 1.5 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            MindDrop
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Iniciá sesión para continuar
          </Typography>
        </Box>

        <LoginForm />

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            ¿No tenés cuenta?
          </Typography>
          <Button
            variant="text"
            onClick={onSwitch}
            sx={{ textTransform: "none", fontWeight: 600 }}
          >
            Crear una cuenta
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
