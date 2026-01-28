-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 28 Jan 2026 pada 09.31
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smart_disaster_volunteer`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `assignments`
--

CREATE TABLE `assignments` (
  `id_assignment` int(11) NOT NULL,
  `id_volunteer` int(11) NOT NULL,
  `id_disaster` int(11) NOT NULL,
  `tugas` varchar(150) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `disasters`
--

CREATE TABLE `disasters` (
  `id_disaster` int(11) NOT NULL,
  `nama_bencana` varchar(100) DEFAULT NULL,
  `lokasi` varchar(100) DEFAULT NULL,
  `tanggal` date DEFAULT NULL,
  `status` enum('aktif','selesai') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `disasters`
--

INSERT INTO `disasters` (`id_disaster`, `nama_bencana`, `lokasi`, `tanggal`, `status`, `created_at`) VALUES
(3, 'Banjir', 'Sukabumi', '2025-01-10', 'aktif', '2026-01-28 06:53:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','koordinator','relawan') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama`, `email`, `password`, `role`, `created_at`) VALUES
(4, '', 'andi_update@gmail.com', '$2b$10$/K..PESU3D0VvvLxvNQjSudNe8h3Tp.Irg1RNXW1aUYBDJZROeKha', '', '2026-01-25 09:42:48'),
(5, 'pirni', 'pirni@gmail.com', '$2b$10$xu6YFXgKbScCv1yQ5wVmi.mNDnRYxYDZfjE4KN/XDmA/ofSEm6MHS', 'relawan', '2026-01-25 13:27:07'),
(6, 'Budi Santoso', 'budi@gmail.com', '$2b$10$qZT63J.UwgbK0g8Sesv6TuCzmcMNitj3/DXy7KMnZ9/qXxjib2XVS', 'relawan', '2026-01-26 02:34:30'),
(8, 'Pirni Updated', '', '$2b$10$p1Gh3hJijXrVBWHKN/IVxOvbCLtBHhLOQlnI6/gkv7kTnF7BkqkSG', 'admin', '2026-01-26 17:05:21'),
(10, 'pirni', 'pirni@gmail.com', '$2b$10$E2NGY5SdTRhpVshw1Wiq3uusgCR5rkLdgRfnn94b6qFOVO3Hswjcu', 'admin', '2026-01-26 17:07:32'),
(11, 'Pirni', 'pirni@gmail.com', '$2b$10$GrABQfvsB6eQLmuWHuF8C.QdVQHXPwJeRVarouJ1tcJlc0BwtHFyC', 'admin', '2026-01-26 17:18:36'),
(12, 'sahla', 'sahla_saja@gmail.com', '$2b$10$05FW9f/1guZtPJUfVFAp3uXyRa.ox/j1kho0EaC3F0efXfKHi/KDe', 'admin', '2026-01-26 17:19:37');

-- --------------------------------------------------------

--
-- Struktur dari tabel `volunteers`
--

CREATE TABLE `volunteers` (
  `id_volunteer` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `skill` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `volunteers`
--

INSERT INTO `volunteers` (`id_volunteer`, `id_user`, `skill`, `created_at`) VALUES
(2, 5, 'Medis', '2026-01-26 15:52:38');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`id_assignment`),
  ADD KEY `fk_assignment_volunteer` (`id_volunteer`),
  ADD KEY `fk_assignment_disaster` (`id_disaster`);

--
-- Indeks untuk tabel `disasters`
--
ALTER TABLE `disasters`
  ADD PRIMARY KEY (`id_disaster`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indeks untuk tabel `volunteers`
--
ALTER TABLE `volunteers`
  ADD PRIMARY KEY (`id_volunteer`),
  ADD KEY `fk_volunteer_user` (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `assignments`
--
ALTER TABLE `assignments`
  MODIFY `id_assignment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `disasters`
--
ALTER TABLE `disasters`
  MODIFY `id_disaster` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `volunteers`
--
ALTER TABLE `volunteers`
  MODIFY `id_volunteer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `fk_assignment_disaster` FOREIGN KEY (`id_disaster`) REFERENCES `disasters` (`id_disaster`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_assignment_volunteer` FOREIGN KEY (`id_volunteer`) REFERENCES `volunteers` (`id_volunteer`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `volunteers`
--
ALTER TABLE `volunteers`
  ADD CONSTRAINT `fk_volunteer_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
