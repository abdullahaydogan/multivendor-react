// src/pages/about/AboutUs.jsx
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
import StoryIllustration from "../../assets/illustrations/photo1.jpg"; // Yerel illüstrasyon

const team = [
  { name: "Abdullah Aydoğan", role: "Kurucu & CEO", img: "/team/ali.jpg" },
  { name: "Oğuzhan Karahan", role: "CTO",          img: "/team/ayse.jpg" },
  { name: "Oğuzhan Karahan", role: "CMO",          img: "/team/mehmet.jpg" },
];

export default function AboutUs() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Başlık */}
      <Typography
        variant={isSm ? "h4" : "h3"}
        align="center"
        gutterBottom
        sx={{ color: theme.palette.primary.main, fontWeight: 700, mb: 4 }}
      >
        Hakkımızda
      </Typography>

      {/* Hikayemiz */}
      <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }}>
        {/* Görsel */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={StoryIllustration}
            alt="Hikayemiz"
            sx={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: 2,
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            }}
          />
        </Grid>

        {/* Metin */}
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              backgroundColor: theme.palette.background.paper,
              p: { xs: 3, md: 6 },
              borderRadius: 2,
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Hikayemiz
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              KOU Bazaar, 2024 yılında “yerelden küresele” vizyonuyla kuruldu.
              Kurucumuz Abdullah'ın girişimci ruhu ve “en kaliteli deneyimi en geniş
              kitleye ulaştırmak” prensibi etrafında şekillenen platformumuz,
              bugün Türkiye’nin dört bir yanındaki yerel satıcıları ve dünya
              çapındaki müşterileri güvenle buluşturuyor.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* Misyon & Vizyon */}
      <Grid container spacing={4} mb={8}>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <RocketLaunchIcon
                sx={{
                  fontSize: 48,
                  color: theme.palette.secondary.main,
                  mb: 2,
                }}
              />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Misyonumuz
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Yerel satıcıları destekleyen, kullanıcı dostu bir pazar yeri
                sunarak, hem satıcıların hem de müşterilerin en iyi deneyimi
                yaşamasını sağlamak.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3} sx={{ borderRadius: 2, height: "100%" }}>
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <VisibilityIcon
                sx={{ fontSize: 48, color: theme.palette.success.main, mb: 2 }}
              />
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Vizyonumuz
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Dünya çapında güvenilen, sürdürülebilir ve yenilikçi bir
                multivendor platformu olarak, yerel üreticileri küresel
                müşterilerle buluşturmak.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ my: 6 }} />

      {/* Ekip */}
      <Box mb={4} textAlign="center">
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          Ekibimiz
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 2,
                  textAlign: "center",
                  py: 6,
                  px: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: theme.shadows[6],
                  },
                }}
              >
                <Avatar
                  src={member.img}
                  alt={member.name}
                  sx={{
                    width: 96,
                    height: 96,
                    mx: "auto",
                    mb: 2,
                    border: `4px solid ${theme.palette.primary.main}`,
                  }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {member.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Divider sx={{ my: 6 }} />

      {/* Alt Not */}
      <Box textAlign="center" px={2}>
        <PeopleIcon
          sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
        />
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          KOU Bazaar — Toplulukları bir araya getiren, yerelden küresele köprü
          kuran pazar yeriniz.
        </Typography>
      </Box>
    </Container>
  );
}
