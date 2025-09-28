import { Monitor, Gamepad2, Cpu, Tv, Joystick, HardDrive } from "lucide-react";

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaMobileAlt,
  FaLinux,
  FaSteam,
  FaItchIo,
  FaApple,
  FaAndroid,
} from "react-icons/fa";

import {
  SiNintendoswitch,
  SiNintendo,
  SiSega,
  SiAtari,
  SiEpicgames,
  SiGogdotcom,
  SiMacos,
  SiIos,
} from "react-icons/si";

/**
 * Platform icon mapping
 * Return React component or null if not found
 */
export const getPlatformIcon = (platformName) => {
  const icons = {
    // PC Platforms
    PC: FaWindows,
    Windows: FaWindows,
    macOS: SiMacos,
    Linux: FaLinux,

    // PlayStation - bütün versiyalar üçün eyni icon
    PlayStation: FaPlaystation,
    "PlayStation 5": FaPlaystation,
    "PlayStation 4": FaPlaystation,
    "PlayStation 3": FaPlaystation,
    "PlayStation 2": FaPlaystation,
    "PlayStation 1": FaPlaystation,
    PlayStation1: FaPlaystation,
    PSX: FaPlaystation,
    "PlayStation Portable": FaPlaystation,
    PSP: FaPlaystation,
    "PlayStation Vita": FaPlaystation,
    PSVita: FaPlaystation,
    "PlayStation VR": FaPlaystation,

    // Xbox - bütün versiyalar üçün eyni icon
    Xbox: FaXbox,
    "Xbox Series X/S": FaXbox,
    "Xbox Series X": FaXbox,
    "Xbox Series S": FaXbox,
    "Xbox One": FaXbox,
    "Xbox 360": FaXbox,
    "Xbox Original": FaXbox,

    // Nintendo - Switch üçün xüsusi icon, qalan üçün ümumi
    "Nintendo Switch": SiNintendoswitch,
    Switch: SiNintendoswitch,
    Nintendo: SiNintendo,
    "Nintendo 3DS": SiNintendo,
    "3DS": SiNintendo,
    "Nintendo DS": SiNintendo,
    "Nintendo Wii": SiNintendo,
    "Nintendo Wii U": SiNintendo,
    "Nintendo GameCube": SiNintendo,
    "Nintendo 64": SiNintendo,
    "Super Nintendo": SiNintendo,
    SNES: SiNintendo,
    "Nintendo Entertainment System": SiNintendo,
    NES: SiNintendo,
    "Game Boy": SiNintendo,
    "Game Boy Color": SiNintendo,
    "Game Boy Advance": SiNintendo,

    // Mobile Platforms
    Mobile: FaMobileAlt,
    iOS: SiIos,
    iPhone: SiIos,
    iPad: SiIos,
    Android: FaAndroid,

    // Classic/Retro Platforms
    Sega: SiSega,
    "Sega Genesis": SiSega,
    "Sega Mega Drive": SiSega,
    "Sega Saturn": SiSega,
    "Sega Dreamcast": SiSega,
    "Sega Master System": SiSega,
    "Sega Game Gear": SiSega,
    "Sega CD": SiSega,
    "Sega 32X": SiSega,

    Atari: SiAtari,
    "Atari 2600": SiAtari,
    "Atari 7800": SiAtari,
    "Atari 5200": SiAtari,
    "Atari Jaguar": SiAtari,
    "Atari Lynx": SiAtari,
    "Atari ST": SiAtari,

    // Web/Browser
    Web: Monitor,
    Browser: Monitor,
    "Web Browser": Monitor,

    // VR Platforms
    VR: Cpu,
    "Oculus Rift": Cpu,
    "Oculus Quest": Cpu,
    "HTC Vive": Cpu,
    "Windows Mixed Reality": Cpu,

    // Digital Stores/Platforms
    Steam: FaSteam,
    Epic: SiEpicgames,
    "Epic Games Store": SiEpicgames,
    GOG: SiGogdotcom,
    "itch.io": FaItchIo,

    // Arcade & Others
    Arcade: Joystick,
    "Neo Geo": Joystick,
    "Neo Geo Pocket": Joystick,
    "TurboGrafx-16": Gamepad2,
    "PC Engine": Gamepad2,
    "3DO": HardDrive,
    "Philips CD-i": HardDrive,
    WonderSwan: Gamepad2,

    // Apple Computers
    "Apple II": FaApple,
    Macintosh: FaApple,

    // Default fallbacks
    Console: Tv,
    Handheld: Gamepad2,
    Computer: Monitor,
    Default: Gamepad2,
  };

  return icons[platformName] || null;
};
