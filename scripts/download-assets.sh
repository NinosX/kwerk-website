#!/bin/bash
# Download all assets from kwerk.fr
BASE="https://kwerk.fr"
OUT="public"

# Create directories
mkdir -p "$OUT/images/content"
mkdir -p "$OUT/images/galerie/saint-honore"
mkdir -p "$OUT/images/galerie/messine"
mkdir -p "$OUT/images/galerie/madeleine"
mkdir -p "$OUT/images/galerie/haussmann"
mkdir -p "$OUT/images/event"
mkdir -p "$OUT/images/caroussel_service"
mkdir -p "$OUT/images/messine"
mkdir -p "$OUT/images/footer_social"

# Global/UI
curl -sL "$BASE/images/logo_kwerk.png" -o "$OUT/images/logo_kwerk.png"
curl -sL "$BASE/images/menu_burger.svg" -o "$OUT/images/menu_burger.svg"
curl -sL "$BASE/images/menu_burger_noir.svg" -o "$OUT/images/menu_burger_noir.svg"
curl -sL "$BASE/images/logo-sans-bureaux.png" -o "$OUT/images/logo-sans-bureaux.png"
curl -sL "$BASE/images/logo-kwerk-noir.png" -o "$OUT/images/logo-kwerk-noir.png"
curl -sL "$BASE/images/close_cross.svg" -o "$OUT/images/close_cross.svg"
curl -sL "$BASE/images/adresses.png" -o "$OUT/images/adresses.png"
curl -sL "$BASE/images/logo_adresses.svg" -o "$OUT/images/logo_adresses.svg"
curl -sL "$BASE/images/footer_social/instagram.svg" -o "$OUT/images/footer_social/instagram.svg"
curl -sL "$BASE/images/footer_social/linkedin.svg" -o "$OUT/images/footer_social/linkedin.svg"

# Content images
CONTENT_IMAGES=(
  "Lobby_Mes_1.jpg"
  "Escalier_SHO_1.jpg"
  "Lobby_Mad_1.jpg"
  "Lobby_Hsm_1.jpg"
  "Dana_1.jpg"
  "Sport_Sho_1.jpg"
  "Rooftop_Sho_IA_1.png"
  "BARISTA_MESSINE(2).jpg"
  "ESPACE_WELLNESS_MESSINE(5).jpg"
  "Rooftop_Madeleine_IA_1.png"
  "SALLE_DE_REUNION_MESSINE(10).jpg"
  "SHO_privatifs.png"
  "Lobby_SHO_accueil.jpg"
  "Suite_SHO_v2.png"
  "KWERK-ST_HONORE-JUILLET-22_006_FA.jpg"
  "Rooftop_SHO_TE.jpg"
  "Rooftop_Sho_2.jpg"
  "ROOFTOP_MESSINE(4).jpg"
  "Salle_de_reunion_Mes_1.jpg"
  "Sport_Mes_1.jpg"
  "YOGA.jpg"
  "Lobby_Mes_2.jpg"
  "Lobby_Mes_Fauteuils_3.jpg"
  "Rooftop_Mes_1.jpg"
  "Rooftop_Mad_1.png"
  "Lobby_Mad_3.png"
  "HS_Lobby_salon_entree.jpg"
  "Lobby_Hsm_4.png"
  "Kwerk_Hausmann_2025_(c)_21.jpg"
  "Lobby_Hsm_3.jpg"
  "Rooftop_HSM_2.png"
  "Bureaux_Hsm_1.png"
  "Suite_SHO_2.png"
  "bureau_header.png"
)
for img in "${CONTENT_IMAGES[@]}"; do
  echo "Downloading content/$img"
  curl -sL "$BASE/images/content/$(echo "$img" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g')" -o "$OUT/images/content/$img"
done

# Carousel/service
curl -sL "$BASE/images/caroussel_service/dana.png" -o "$OUT/images/caroussel_service/dana.png"

# Messine specific
curl -sL "$BASE/images/messine/ESPACE_WELLNESS_MESSINE_5.jpg" -o "$OUT/images/messine/ESPACE_WELLNESS_MESSINE_5.jpg"

# Event images
curl -sL "$BASE/images/event/Terrasse_MAD.png" -o "$OUT/images/event/Terrasse_MAD.png"
curl -sL "$BASE/images/event/Winter_Party_1.png" -o "$OUT/images/event/Winter_Party_1.png"

# Gallery - Saint-Honore
SHO_GALLERY=(
  "SuiteSHOv2.png"
  "RooftopSho2.jpg"
  "RooftopShoIA1.png"
  "EscalierSHO1.jpg"
  "SuiteSHO2.png"
  "LOBBY_SHO_LOUNGE.jpg"
  "Barista-SHO.png"
  "Traiteur.jpg"
  "KWERK-STHONORE-JUILLET-22_082_FA.jpg"
  "LobbyShotisaniere.jpg"
  "Traiteur_2.jpg"
  "DANA(10)(1).jpg"
  "SportSho1.jpg"
  "KWERK-STHONORE-JUILLET-22_006_FA.jpg"
  "SHOprivatifs.png"
  "SHO_8EME.jpeg"
  "Dana1.jpg"
  "Event_SHO_Lobby.png"
  "SuitesignatureSHO1IA.png"
  "LobbySHOaccueil.jpg"
  "RooftopSHOTE.jpg"
  "Danaheader.jpg"
)
for img in "${SHO_GALLERY[@]}"; do
  echo "Downloading galerie/saint-honore/$img"
  curl -sL "$BASE/images/galerie/saint-honore/$(echo "$img" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g')" -o "$OUT/images/galerie/saint-honore/$img"
done

# Gallery - Messine
MES_GALLERY=(
  "BARISTAMESSINE(2).jpg"
  "ESPACEWELLNESSMESSINE(5).jpg"
  "SportMes1.jpg"
  "SalledereunionMes1.jpg"
  "BUREAUMESSINE.jpg"
  "ROOFTOPMESSINE(4).jpg"
  "RooftopMes1.jpg"
  "LobbyMes1.jpg"
  "DomeLobbyMes1.jpg"
  "LobbyMes2Barista.jpg"
  "LobbyMes2.jpg"
  "SAUNAINFRAROUGEMESSINE.jpg"
)
for img in "${MES_GALLERY[@]}"; do
  echo "Downloading galerie/messine/$img"
  curl -sL "$BASE/images/galerie/messine/$(echo "$img" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g')" -o "$OUT/images/galerie/messine/$img"
done
# Special character in filename
echo "Downloading galerie/messine/SALLEDERÉUNIONMESSINE(10).jpg"
curl -sL "$BASE/images/galerie/messine/SALLEDERE%CC%81UNIONMESSINE%2810%29.jpg" -o "$OUT/images/galerie/messine/SALLEDERÉUNIONMESSINE(10).jpg" 2>/dev/null
curl -sL "$BASE/images/galerie/messine/SALLEDER%C3%89UNIONMESSINE%2810%29.jpg" -o "$OUT/images/galerie/messine/SALLEDERÉUNIONMESSINE(10).jpg" 2>/dev/null

# Gallery - Madeleine
MAD_GALLERY=(
  "RooftopMad1.png"
  "LobbyMad3.png"
  "LobbybaristaMad1.jpg"
  "AccueilMad1.png"
  "RooftopMadeleineIA1.png"
  "PasserelleMad1.png"
  "Privatifs_Bureau_MAD.png"
  "SallecommuneMad1.png"
  "LobbyMad2.jpg"
  "YogaMad1.png"
  "LobbyMad1.jpg"
)
for img in "${MAD_GALLERY[@]}"; do
  echo "Downloading galerie/madeleine/$img"
  curl -sL "$BASE/images/galerie/madeleine/$img" -o "$OUT/images/galerie/madeleine/$img"
done

# Gallery - Haussmann
HSM_GALLERY=(
  "BISTRO-EVENT-HSM.png"
  "TerrasseHsm1.png"
  "LobbyHsm4.png"
  "Kwerk_Hausmann_2025_(c)_21.jpg"
  "LobbyHsm2.jpg"
  "LobbyHsm1.jpg"
  "RooftopHSM2.png"
  "LobbyHsm3.jpg"
  "HS_Lobbysalonentree.jpg"
  "BureauxHsm1.png"
)
for img in "${HSM_GALLERY[@]}"; do
  echo "Downloading galerie/haussmann/$img"
  curl -sL "$BASE/images/galerie/haussmann/$(echo "$img" | sed 's/ /%20/g; s/(/%28/g; s/)/%29/g')" -o "$OUT/images/galerie/haussmann/$img"
done

echo ""
echo "=== Download complete ==="
echo "Total files downloaded:"
find "$OUT/images" -type f | wc -l
