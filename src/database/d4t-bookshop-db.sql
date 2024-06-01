-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 02, 2024 lúc 12:50 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `d4t-bookshop-db`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookmarks`
--

CREATE TABLE `bookmarks` (
  `id` int(11) NOT NULL,
  `title_for_search` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `PageNumber` int(11) NOT NULL,
  `clickPositionY` int(11) NOT NULL DEFAULT 120
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bookmarks`
--

INSERT INTO `bookmarks` (`id`, `title_for_search`, `Username`, `PageNumber`, `clickPositionY`) VALUES
(4, 'dac_nhan_tam', 'duongvandung2k3', 11, 120),
(5, 'dac_nhan_tam', 'duongvandung2k3', 10, 120),
(6, '7_thoi_quen_de_thanh_dat', 'duongvandung2k3', 11, 120),
(7, '7_thoi_quen_de_thanh_dat', 'duongvandung2k3', 100, 120),
(8, 'phi_ly_tri', 'duongvandung2k3', 11, 173),
(9, '7_thoi_quen_de_thanh_dat', 'a', 12, 1017),
(10, 'suy_nghi_va_lam_giau', 'duongvandung2k3', 2, 545),
(11, 'outwitting_the_devil', 'duongvandung2k3', 1, 256),
(12, 'outwitting_the_devil', 'ddung203.contact', 2, 1029);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `BookID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `title_for_search` varchar(255) DEFAULT 'book',
  `CoverURL` text DEFAULT 'https://salt.tikicdn.com/cache/280x280/ts/product/cb/ea/f1/54614e3e1c9d5de1e7cd6b1be97bbbb4.jpg.webp',
  `Author` varchar(255) DEFAULT 'D4T Team',
  `publication_year` int(11) NOT NULL DEFAULT 2020,
  `Description` text DEFAULT NULL,
  `Categories` varchar(255) DEFAULT NULL,
  `language` varchar(255) NOT NULL,
  `PageNumber` int(11) DEFAULT 0,
  `Price` int(11) DEFAULT 10,
  `Views` int(11) DEFAULT 0,
  `star` int(11) DEFAULT 4,
  `isShowBook` int(11) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`BookID`, `Title`, `title_for_search`, `CoverURL`, `Author`, `publication_year`, `Description`, `Categories`, `language`, `PageNumber`, `Price`, `Views`, `star`, `isShowBook`, `created_at`, `updated_at`) VALUES
(41, '7 thói quen để thành đạt', '7_thoi_quen_de_thanh_dat', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2F7_thoi_quen_de_thanh_dat-001.png?alt=media&token=0e30ede3-45e1-4089-bf74-e45619eb3e11', 'D4T Team', 1989, 'Cuốn sách Bảy thói quen của người thành đạt giới thiệu tới người đọc những thói quen tạo nên sự khác biệt của những người có khả năng xử lý các vấn đề quanh mình một cách đặc biệt hiệu quả. Tác giả tin rằng những người có được cuộc sống thành đạt và trọn vẹn không coi vị thế độc lập cá nhân là mục tiêu theo đuổi cuối cùng, mà họ luôn hướng tới khả năng điều chỉnh bản thân mình từ bên trong với những nguyên tắc phổ quát, ví như lòng trung thực và tính chính trực.', 'Lối sống', 'Tiếng Việt', 481, 0, 100, 4, 1, '2024-04-29 12:54:53', '2024-05-17 14:49:53'),
(43, 'Đắc nhân tâm', 'dac_nhan_tam', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fdac_nhan_tam-001.png?alt=media&token=575f7544-32c8-40c3-91e3-5893f8fa14b3', 'D4T Team', 1936, 'Đắc Nhân Tâm của tác giả Dale Carnegie là một trong những cuốn sách kinh điển nhất trong lĩnh vực phát triển bản thân và kỹ năng giao tiếp. Cuốn sách này đã được viết và xuất bản lần đầu tiên vào năm 1936. Cho đến nay, Đắc Nhân Tâm vẫn được đánh giá là một trong những tác phẩm quan trọng nhất trong lịch sử văn học thế giới. \n\nCuốn sách này tổng hợp một loạt các nguyên tắc và kỹ năng giúp độc giả nâng cao khả năng giao tiếp, xây dựng mối quan hệ tốt hơn và trở thành một người lãnh đạo toàn diện. Điểm hấp dẫn nhất ở Đắc Nhân Tâm chính là việc tác giả đã sử dụng các ví dụ cụ thể từ cuộc sống hàng ngày để đưa ra dẫn chứng, giải thích cho từng nguyên tắc. Nhờ vậy, người đọc sẽ dễ dàng hiểu được cách áp dụng những nguyên tắc này vào cuộc sống thường nhật.', 'Lối sống', 'Tiếng Việt', 322, 400, 142, 4, 1, '2024-04-29 12:54:53', '2024-05-17 14:49:56'),
(45, 'Chiến thắng con quỷ trong bạn', 'chien_thang_con_quy_trong_ban', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fchien_thang_con_quy_trong_ban-001.png?alt=media&token=9da7b0a5-4b1f-420a-9138-8ee0a76c8d11', 'D4T Team', 2011, 'Cuốn sách là cuộc trò chuyện của Napoleon Hill và Con Quỷ. Sau bao nhiêu năm miệt mài nghiên cứu cuối cùng ông cũng phát hiện ra Con Quỷ, bắt nó phải thú tội và tiết lộ những sự thật kinh hoàng về nơi nó sống, cách nó kiểm soát tâm trí con người và cách để con người chiến thắng được nó. Khi đọc cuốn sách này, có thể bạn sẽ tự hỏi, cuộc trò chuyện này có thật không? Con Quỷ là có thật hay là một sản phẩm của trí tưởng tượng của Napoleon Hill. Nhưng quyền lựa chọn cách hiểu vấn đề là của bạn. Bởi lẽ cuối cùng, thông qua cuộc trò chuyện với Con Quỷ, Napoleon Hill đã cung cấp cho chúng ta chìa khóa để chiến thắng Con Quỷ trong cuộc sống riêng của mỗi người.\n\nHãy tận hưởng cuốn sách kỳ diệu này và chia sẻ nó với gia đình, bạn bè. Sức mạnh trong ngôn từ của Napoleon Hill có thể và sẽ thay đổi cuộc đời bạn.', 'Lối sống', 'Tiếng Việt', 234, 250, 90, 4, 1, '2024-04-29 12:54:53', '2024-05-17 14:49:59'),
(46, 'Dám nghĩ lớn', 'dam_nghi_lon', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fdam_nghi_lon-001.png?alt=media&token=45118485-4c1d-48f7-a67f-6a54ace990f2', 'D4T Team', 1959, 'Hãy thử nghĩ về những người có mức thu nhập cao hơn bạn gấp 5 lần. Có phải họ thông minh hơn bạn gấp 5 lần? Họ làm việc vất vả hơn bạn gấp 5 lần? Nếu câu trả lời của bạn là “không” thì bạn sẽ chạm đến câu hỏi này: “Vậy, họ có những đức tính, phẩm chất hay bí quyết gì mà tôi không có?”\n\nQua quyển sách đã được bán ra hơn 4 triệu bản trên khắp thế giới, Tiến sĩ David J. Schwartz, sẽ giải đáp cho bạn lý do tại sao họ lại khác với chúng ta, đó là: Họ dám nghĩ lớn hơn chúng ta gấp 5 lần!\n\nDám nghĩ lớn! giới thiệu đến bạn một phương pháp tư duy đơn giản nhưng hiệu quả đến kỳ diệu. Quyển sách này trình bày một cách sinh động và dễ hiểu tiến trình giúp bạn đạt được sự mãn nguyện cao nhất trong nghề nghiệp, trong cuộc sống gia đình và trong cộng đồng của bạn. Bạn không cần phải thông minh tuyệt đỉnh hay tài năng xuất chúng mới đạt được thành tích lớn lao, bạn chỉ cần rèn luyện và thực hành thường xuyên thói quen dám nghĩ lớn.\n\nNhững hướng dẫn đơn giản mà tác giả đưa ra trong cuốn sách không phải là những lý thuyết chưa được kiểm nghiệm. Đó không phải là sự phỏng đoán và ý kiến của một người. Mà đó là những cách tiếp cận với vô vàn tình huống của cuộc sống đã được chứng minh, trở thành những hướng dẫn có thể áp dụng phổ biến và tạo ra tác dụng kỳ diệu.\n\nĐọc và suy ngẫm những nội dung được chia sẻ trong cuốn sách là bạn đã thành công được một nửa rồi, phần còn lại là những suy nghĩ và hành động của bạn. Từng bước, từng bước một cuốn sách sẽ dẫn dắt bạn đến thành công vượt bậc bằng sự tự tin, thấu hiểu bản thân và biết cách nâng tầm suy nghĩ của chính bạn theo cách nghĩ của những người quan trọng.\n\nCuốn sách thực sự cần thiết với những hướng dẫn giúp bạn xây dựng diện mạo của bản thân một cách tốt nhất, từ trang phục bề ngoài đến cả suy nghĩ, lòng tự tin bên trong và cả năng lực tư duy đột phá của chính bản thân bạn. Cuốn sách có chen lẫn những phần trắc nghiệm, những bảng hướng dẫn ngắn gọn về các mục tiêu bạn sẽ đạt được theo từng mốc thời gian ngắn dài khác nhau.\n\nVới DÁM NGHĨ LỚN, bạn sẽ sống tự tin hơn, giàu có hơn, hạnh phúc hơn, đạt được những thành tựu to lớn, kiếm được nhiều tiền, có nhiều bạn và được mọi người tôn trọng. Bạn sẽ hiểu tư duy táo bạo mang đến điều kỳ diệu cho bạn như thế nào. Hãy bắt đầu với câu nói của nhà hiền triết vĩ đại Disraeli: “Cuộc đời thật ngắn ngủi, do vậy, đừng sống nhỏ nhoi.”', 'Lối sống', 'Tiếng Việt', 360, 200, 200, 4, 1, '2024-04-29 12:54:53', '2024-05-17 14:50:02'),
(47, 'Magic of thinking', 'magic_of_thinking', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fmagic_of_thinking-001.png?alt=media&token=bb98bdab-e67a-4c7a-a3c8-21f2babe9b6a', 'D4T Team', 1987, 'Mô tả của sách', 'Lối sống', 'Tiếng Anh', 318, 400, 135, 5, 1, '2024-04-29 12:54:53', '2024-05-09 19:12:09'),
(48, 'Nói nhiều không bằng nói đúng', 'noi_nhieu_khong_bang_noi_dung', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fnoi_nhieu_khong_bang_noi_dung-001.png?alt=media&token=f9f0251a-4911-4462-81a5-aa330b19b0bf', 'D4T Team', 2017, 'Giao tiếp là một kỹ năng đòi hỏi không chỉ cách cư xử, lời ăn tiếng nói của chúng ta mà hơn hết đó còn là nhân cách của mỗi người thể hiện qua từng hành động của bản thân. Không quá khó hiểu khi mà giao tiếp luôn là kỹ năng mà tất cả chúng ta đều phải dành rất nhiều thời gian để học hỏi, trau dồi và thực hành rất nhiều để hoàn thiện bản thân mỗi ngày. “Nói nhiều không bằng nói đúng” là cuốn sách sẽ giúp bạn trẻ dễ dàng tiếp thu những nghệ thuật thật sự của giao tiếp qua 3 chương sách, sự ngắn gọn cùng những tình huống thực tế giúp bạn đọc dễ dàng hình dung, học hỏi và thực hành trong cuộc sống hàng ngày. Bạn đọc có thể dùng những trải nghiệm của chính bản thân để chọn lọc những phương thức giao tiếp thật phù hợp và hiệu quả.', 'Kỹ năng', 'Tiếng Việt', 162, 300, 110, 5, 1, '2024-04-29 12:54:53', '2024-05-09 19:11:38'),
(49, 'Outwitting the devil', 'outwitting_the_devil', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Foutwitting_the_devil-001.png?alt=media&token=979e73d9-02dd-4acc-ac95-55a2567a0a2c', 'D4T Team', 2011, '“Napoleon Hill was one of America’s great, influential thinkers who continues to have an enormous impact today.” ―Steve Forbes, editor-in-chief of Forbes magazine\n\nBestselling author Napoleon Hill reveals the seven principles of good that allow us to triumph over obstacles…and find success.\n\nUsing his legendary ability to get to the root of human potential, Napoleon Hill digs deep to reveal how fear, procrastination, anger, and jealousy prevent us from realizing our personal goals. This long-suppressed parable, once considered too controversial to publish, was written by Hill in 1938 following the publication of his classic bestseller, Think and Grow Rich. Annotated and edited for a contemporary audience by Rich Dad, Poor Dad and Three Feet from Gold coauthor Sharon Lechter, this book is profound, powerful, resonant, and rich with insight.', 'Lối sống', 'Tiếng Anh', 302, 0, 98, 3, 1, '2024-04-29 12:54:53', '2024-05-09 19:43:47'),
(50, 'Phi lý trí', 'phi_ly_tri', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fphi_ly_tri-001.png?alt=media&token=9c35dcc9-58b8-4994-840c-b325516176f5', 'D4T Team', 2008, 'Cuốn sách Phi Lý Trí - tác giả Dan Ariely là một cuốn sách mô tả những hành vi phi lý trí trong mỗi quyết định của con người. Theo ông, trong mỗi sự việc, con người hành động phi lý trí hơn chúng ta tưởng. Để lý giải động cơ này, ông đã giải thích các cơ chế trong các chương sách', 'Lối sống', 'Tiếng Việt', 268, 250, 458, 4, 1, '2024-04-29 12:54:53', '2024-06-01 16:27:39'),
(51, 'predictable', 'predictable', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fpredictable-001.png?alt=media&token=aa77039f-ebe1-42c5-8850-55fd3d7cfd56', 'D4T Team', 2009, 'Mô tả của sách', 'Lối sống', 'Tiếng Việt', 308, 0, 220, 3, 1, '2024-04-29 12:54:53', '2024-05-09 19:41:01'),
(52, 'Suy nghĩ và làm giàu', 'suy_nghi_va_lam_giau', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/books_cover%2Fsuy_nghi_va_lam_giau-001.png?alt=media&token=0ae9db30-8865-4872-9022-6b86e116a70a', 'D4T Team', 1937, 'Suy nghĩ giàu & làm giàu là cuốn sách dạy chúng ta cách “suy nghĩ”. Vật chất quyết định ý thức nhưng đồng thời để có được kết quả thực tế, chúng ta phải tạo ra những năng lượng từ ý nghĩ để thúc đẩy hành vi hoàn thiện vật chất mong muốn. ', 'Lối sống', 'Tiếng Việt', 170, 9000, 250, 4, 1, '2024-04-29 12:54:53', '2024-05-29 07:56:57'),
(53, 'S1', 's1', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2F5156008_2706576%20%5BConverted%5D.png?alt=media&token=7bb6bd5c-c079-4601-b376-6991f737bb9e', 'D', 2020, '123', 'Hành động', 'Tiếng Anh', 191, 1000, 0, NULL, 0, '2024-05-17 18:05:25', '2024-05-17 18:11:42'),
(54, 'S12', 's12', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2F5156008_2706576%20%5BConverted%5D.png?alt=media&token=7bb6bd5c-c079-4601-b376-6991f737bb9e', 'D', 2020, '123', 'Hành động', 'Tiếng Anh', 191, 1000, 0, NULL, 0, '2024-05-17 18:07:17', '2024-05-17 18:09:12'),
(55, 'S14', 's14', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2Fimage_2024-03-03_02-57-55-2.png?alt=media&token=a6cdc483-dda0-48c4-8c6c-eb65bba9d2d7', 'D', 2020, '123', 'Hành động', 'Tiếng Anh', 191, 1000, 0, NULL, 0, '2024-05-17 18:08:55', '2024-05-17 18:11:44'),
(56, 'Sach1', 's13', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2Fits2024.jpg?alt=media&token=d8332dd8-bb1d-49ea-940c-41ea76ef33ba', 'Ddung', 2020, 'Mô tả của cuốn sách', 'Gia đình', 'Tiếng Việt', 191, 1990, 0, NULL, 0, '2024-05-17 18:12:08', '2024-05-17 18:44:51'),
(57, 'S100', 's100', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2FQT_2.png?alt=media&token=f1ce3d7a-a826-4065-af17-015ca2a64fa7', 'D', 2020, '123', 'Viễn tưởng', 'Tiếng Anh', 191, 1000, 0, NULL, 0, '2024-05-28 11:02:28', '2024-05-28 11:02:44'),
(58, 'Them sach', 'them_sach', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2Fsrc.jpg?alt=media&token=b96cede1-3c41-4460-8b05-b6b76a7f9df3', 'Dung', 2020, '123', 'Kinh dị', 'Tiếng Việt', 191, 2000, 0, NULL, 0, '2024-05-28 11:09:58', '2024-05-29 08:08:43'),
(59, 'S11234', 's11234', 'https://firebasestorage.googleapis.com/v0/b/d4t-project.appspot.com/o/images%2Ftaoanhdep_xoa_nen_anh_88193.png?alt=media&token=407d98ea-a3d5-4ba9-ad27-af675f2c7ca7', 'D', 2020, '123', 'Tình cảm', 'Tiếng Việt', 191, 1000, 0, 4, 0, '2024-05-30 18:55:38', '2024-06-01 20:08:52');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_favorited`
--

CREATE TABLE `book_favorited` (
  `id` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `title_for_search` varchar(255) NOT NULL,
  `createAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `book_favorited`
--

INSERT INTO `book_favorited` (`id`, `Username`, `title_for_search`, `createAt`) VALUES
(12, 'duongvandung2k3', 'noi_nhieu_khong_bang_noi_dung', '2024-05-11 05:05:56'),
(13, 'duongvandung2k3', 'dam_nghi_lon', '2024-05-11 05:37:28'),
(16, 'admin', 'outwitting_the_devil', '2024-05-17 17:45:21'),
(17, 'admin', 'magic_of_thinking', '2024-05-17 17:45:59'),
(18, 'duongvandung2k3', 'suy_nghi_va_lam_giau', '2024-05-29 07:49:26'),
(19, 'ddung203.contact', 'outwitting_the_devil', '2024-05-30 19:02:33');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `book_tracking`
--

CREATE TABLE `book_tracking` (
  `id` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `title_for_search` varchar(255) NOT NULL,
  `isBought` int(11) DEFAULT 0,
  `createAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `book_tracking`
--

INSERT INTO `book_tracking` (`id`, `Username`, `title_for_search`, `isBought`, `createAt`) VALUES
(10, 'duongvandung2k3', '7_thoi_quen_de_thanh_dat', 1, '2024-05-29 06:00:14'),
(12, 'duongvandung2k3', 'dac_nhan_tam', 1, '2024-05-29 06:13:54'),
(13, 'duongvandung2k3', 'predictable', 1, '2024-05-29 06:27:43'),
(19, 'duongvandung2k3', 'suy_nghi_va_lam_giau', 1, '2024-05-29 08:01:10'),
(20, 'duongvandung2k3', 'magic_of_thinking', 1, '2024-05-30 18:55:04'),
(21, 'duongvandung2k3', 'outwitting_the_devil', 1, '2024-05-30 19:00:56'),
(22, 'ddung203.contact', 'outwitting_the_devil', 1, '2024-05-30 19:02:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `CommentCode` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `BookID` int(11) DEFAULT NULL,
  `title_for_search` varchar(255) DEFAULT NULL,
  `Content` varchar(255) NOT NULL,
  `CommentDate` datetime DEFAULT current_timestamp(),
  `isDeleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`ID`, `CommentCode`, `UserID`, `Username`, `BookID`, `title_for_search`, `Content`, `CommentDate`, `isDeleted`) VALUES
(42, 1733752717, 26, 'duongvandung2k3', 45, 'chien_thang_con_quy_trong_ban', 'Xin chao, toi dang doc quyen sach thu 45', '2024-04-20 01:06:31', 1),
(43, 1725747528, 26, 'duongvandung2k3', 43, 'dac_nhan_tam', 'Xin chao, toi dang doc quyen sach thu 43', '2024-04-28 00:37:35', 0),
(44, 1745519491, 26, 'duongvandung2k3', 45, 'chien_thang_con_quy_trong_ban', 'Xin chao, toi dang doc quyen sach thu 45', '2024-04-28 00:43:41', 0),
(45, 1740081291, 20, 'ddung123', 41, '7_thoi_quen_de_thanh_dat', 'Hay', '2024-04-28 00:45:54', 0),
(46, 1792488544, 26, 'duongvandung2k3', 41, '7_thoi_quen_de_thanh_dat', 'Nice :>', '2024-04-28 00:46:44', 0),
(66, 1733526537, 26, 'duongvandung2k3', NULL, 'phi_ly_tri', '123', '2024-05-15 13:54:15', 0),
(67, 1755856010, 26, 'duongvandung2k3', NULL, 'outwitting_the_devil', 'wow', '2024-05-15 14:19:02', 0),
(68, 1734265472, 26, 'duongvandung2k3', NULL, 'phi_ly_tri', 'abc', '2024-05-15 16:50:39', 1),
(69, 1809833744, 28, 'admin', NULL, 'magic_of_thinking', 'Ồ', '2024-05-18 00:43:45', 0),
(70, 1806396730, 28, 'admin', NULL, '7_thoi_quen_de_thanh_dat', 'Page 1 ', '2024-05-28 18:30:57', 0),
(71, 1766857252, 26, 'duongvandung2k3', NULL, 'outwitting_the_devil', 'start', '2024-05-31 02:01:16', 0),
(72, 1739354950, 29, 'ddung203.contact', NULL, 'outwitting_the_devil', 'hay', '2024-05-31 02:02:42', 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `NotificationID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Content` varchar(255) NOT NULL,
  `NotificationDate` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL,
  `insertAt` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `TransactionID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL COMMENT 'Liên kết với bảng Users để xác định người dùng tham gia giao dịch.',
  `TransactionType` varchar(255) DEFAULT NULL COMMENT 'Loại giao dịch (nạp xu, thanh toán mua sách, mượn sách, trả sách, v.v.).',
  `TransactionAmount` int(11) NOT NULL COMMENT ' Số tiền của giao dịch.',
  `tradingCode` int(11) NOT NULL,
  `TransactionDate` datetime DEFAULT current_timestamp() COMMENT 'Ngày thực hiện giao dịch.\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `transactions`
--

INSERT INTO `transactions` (`TransactionID`, `UserID`, `TransactionType`, `TransactionAmount`, `tradingCode`, `TransactionDate`) VALUES
(26, 2, 'THANH_TOAN', 100, 1753886379, '2024-04-04 22:41:23'),
(27, 2, 'THANH_TOAN', 100, 1790937344, '2024-04-04 22:47:39'),
(28, 3, 'THANH_TOAN', 0, 1774822099, '2024-04-04 23:17:41'),
(29, 2, 'THANH_TOAN', 0, 1807139029, '2024-04-04 23:18:32'),
(30, 2, 'NAP_XU', 25, 1789661324, '2024-04-06 21:52:57'),
(31, 2, 'THANH_TOAN', 20, 1743050253, '2024-04-06 21:53:20'),
(32, 5, 'NAP_XU', 25, 1766372613, '2024-04-14 17:29:10'),
(33, 5, 'THANH_TOAN', 200, 1768035470, '2024-04-14 17:30:57'),
(34, 5, 'NAP_XU', 25, 1780116809, '2024-04-14 17:34:19'),
(35, 5, 'NAP_XU', 25, 1746090286, '2024-04-20 01:00:27'),
(36, 5, 'THANH_TOAN', 200, 1800528229, '2024-04-20 01:02:04'),
(37, 5, 'THANH_TOAN', 2, 1732499038, '2024-04-20 01:03:45'),
(38, 5, 'NAP_XU', 25, 1750253499, '2024-04-20 14:10:05'),
(39, 5, 'NAP_XU', 25, 1812438597, '2024-04-20 14:13:56'),
(40, 5, 'NAP_XU', 25, 1767728808, '2024-04-20 14:15:02'),
(41, 5, 'NAP_XU', 25, 1740733737, '2024-04-20 14:18:08'),
(42, 5, 'NAP_XU', 25, 1793300979, '2024-04-20 14:18:56'),
(43, 5, 'NAP_XU', 25, 1787325298, '2024-04-20 14:19:46'),
(44, 5, 'NAP_XU', 25, 1767872902, '2024-04-20 14:21:28'),
(45, 5, 'NAP_XU', 25, 1812559812, '2024-04-20 14:24:59'),
(46, 5, 'NAP_XU', 25, 1804476918, '2024-04-20 14:25:21'),
(47, 5, 'NAP_XU', 25, 1742709776, '2024-04-20 14:46:49'),
(48, 5, 'NAP_XU', 25, 1776231633, '2024-04-20 14:47:15'),
(49, 5, 'NAP_XU', 25, 1776217340, '2024-04-20 14:47:15'),
(50, 5, 'NAP_XU', 25, 1800951757, '2024-04-20 14:47:16'),
(51, 5, 'NAP_XU', 25, 1782554669, '2024-04-20 14:47:18'),
(52, 5, 'NAP_XU', 25, 1776676637, '2024-04-20 14:49:14'),
(53, 5, 'THANH_TOAN', 2, 1765693020, '2024-04-20 14:49:27'),
(54, 5, 'THANH_TOAN', 2, 1809413410, '2024-04-20 14:49:37'),
(55, 5, 'THANH_TOAN', 2, 1778255304, '2024-04-20 14:49:43'),
(56, 5, 'THANH_TOAN', 2, 1771666505, '2024-04-20 14:50:43'),
(57, 5, 'THANH_TOAN', 2, 1812227829, '2024-04-20 15:00:53'),
(58, 5, 'THANH_TOAN', 2, 1766675863, '2024-04-20 15:03:56'),
(59, 5, 'THANH_TOAN', 2, 1752656379, '2024-04-20 15:17:02'),
(60, 5, 'THANH_TOAN', 2, 1769903087, '2024-04-20 15:17:03'),
(61, 5, 'THANH_TOAN', 2, 1755979157, '2024-04-20 15:26:29'),
(62, 5, 'THANH_TOAN', 2, 1769725607, '2024-04-20 15:29:11'),
(63, 5, 'THANH_TOAN', 2, 1760145632, '2024-04-20 15:41:37'),
(64, 5, 'THANH_TOAN', 2, 1813352652, '2024-04-20 15:42:53'),
(65, 5, 'THANH_TOAN', 2, 1761620819, '2024-04-20 15:45:11'),
(66, 5, 'THANH_TOAN', 2, 1741812125, '2024-04-28 00:58:47'),
(67, 5, 'THANH_TOAN', 2, 1759301488, '2024-04-28 00:58:48'),
(68, 5, 'THANH_TOAN', 2, 1774175165, '2024-04-28 00:58:56'),
(69, 20, 'NAP_XU', 25, 1751219992, '2024-04-28 00:59:08'),
(70, 20, 'NAP_XU', 25, 1763484458, '2024-04-28 00:59:25'),
(71, 20, 'NAP_XU', 25, 1732647449, '2024-04-28 00:59:59'),
(72, 20, 'THANH_TOAN', 2, 1746277769, '2024-04-28 01:02:12'),
(73, 26, 'NAP_XU', 15, 1796774555, '2024-05-07 17:32:47'),
(74, 26, 'NAP_XU', 15, 1796400893, '2024-05-07 17:32:58'),
(75, 26, 'NAP_XU', 15, 1759415517, '2024-05-07 17:32:59'),
(76, 26, 'NAP_XU', 1500, 1810222060, '2024-05-07 17:33:18'),
(77, 26, 'THANH_TOAN', 200, 1802610680, '2024-05-07 17:33:39'),
(78, 26, 'NAP_XU', 1500, 1752467008, '2024-05-07 17:33:50'),
(79, 26, 'NAP_XU', 1500, 1740122939, '2024-05-07 17:33:51'),
(80, 26, 'NAP_XU', 1500, 1742882273, '2024-05-07 17:33:52'),
(81, 26, 'THANH_TOAN', 2000, 1741091039, '2024-05-07 17:33:57'),
(82, 26, 'NAP_XU', 1500, 1765306071, '2024-05-28 21:12:02'),
(83, 26, 'NAP_XU', 1500, 1736275648, '2024-05-28 21:12:23'),
(84, 26, 'NAP_XU', 1500, 1770686325, '2024-05-28 21:12:44'),
(85, 26, 'NAP_XU', 1500, 1750981853, '2024-05-28 21:14:42'),
(86, 26, 'NAP_XU', 1500, 1753049539, '2024-05-28 21:14:58'),
(87, 26, 'NAP_XU', 1500, 1788900216, '2024-05-28 21:15:14'),
(88, 26, 'NAP_XU', 1500, 1753790303, '2024-05-28 21:16:56'),
(89, 26, 'NAP_XU', 1500, 1770108725, '2024-05-28 21:18:10'),
(90, 26, 'NAP_XU', 1500, 1779044950, '2024-05-28 21:24:28'),
(91, 26, 'NAP_XU', 1500, 1800624292, '2024-05-28 21:28:50'),
(92, 26, 'NAP_XU', 1500, 1767589615, '2024-05-28 21:29:22'),
(93, 26, 'NAP_XU', 1500, 1786034135, '2024-05-28 21:29:54'),
(94, 26, 'NAP_XU', 25, 1759499904, '2024-05-28 21:30:17'),
(95, 26, 'NAP_XU', 25, 1792288791, '2024-05-28 21:30:22'),
(96, 26, 'THANH_TOAN', 2000, 1771454559, '2024-05-29 13:15:06'),
(97, 26, 'THANH_TOAN', 9000, 1762125631, '2024-05-29 14:57:21'),
(98, 26, 'NAP_XU', 1500, 1789308397, '2024-05-29 15:01:02'),
(99, 26, 'NAP_XU', 1500, 1732951607, '2024-05-29 15:01:04'),
(100, 26, 'THANH_TOAN', 9000, 1784925085, '2024-05-29 15:01:10'),
(101, 26, 'NAP_XU', 1500, 1730838584, '2024-05-29 15:17:28'),
(102, 26, 'THANH_TOAN', 400, 1797158993, '2024-05-31 01:55:04'),
(103, 29, 'NAP_XU', 1500, 1808247570, '2024-05-31 02:02:12'),
(104, 26, 'NAP_XU', 10000, 1752129481, '2024-06-02 00:32:41'),
(105, 26, 'NAP_XU', 10000, 1752357724, '2024-06-02 00:33:16'),
(106, 26, 'NAP_XU', 10000, 1747026001, '2024-06-02 00:35:22'),
(107, 26, 'NAP_XU', 10000, 1810496839, '2024-06-02 00:37:03'),
(108, 26, 'NAP_XU', 10000, 1767972420, '2024-06-02 00:37:17'),
(109, 26, 'NAP_XU', 10000, 1793378126, '2024-06-02 00:37:29'),
(110, 26, 'NAP_XU', 10000, 1753936652, '2024-06-02 00:37:30'),
(111, 26, 'NAP_XU', 10000, 1729076645, '2024-06-02 00:38:06'),
(112, 26, 'NAP_XU', 10000, 1737566747, '2024-06-02 00:47:27'),
(113, 26, 'NAP_XU', 10000, 1762250854, '2024-06-02 00:48:27'),
(114, 26, 'NAP_XU', 10000, 1735361355, '2024-06-02 00:49:13'),
(115, 26, 'NAP_XU', 10000, 1765328135, '2024-06-02 00:51:06'),
(116, 26, 'NAP_XU', 10000, 1757164082, '2024-06-02 00:53:03'),
(117, 26, 'NAP_XU', 1500, 1752508168, '2024-06-02 03:08:07'),
(118, 26, 'NAP_XU', 10000, 1750476190, '2024-06-02 05:31:55'),
(119, 26, 'NAP_XU', 10000, 1805436897, '2024-06-02 05:32:02'),
(120, 26, 'NAP_XU', 10000, 1781993878, '2024-06-02 05:34:16'),
(121, 26, 'NAP_XU', 2998, 1803428846, '2024-06-02 05:36:59'),
(122, 26, 'NAP_XU', 2998, 1773944139, '2024-06-02 05:37:56'),
(123, 26, 'NAP_XU', 2998, 1771142198, '2024-06-02 05:38:25'),
(124, 26, 'NAP_XU', 2998, 1752564525, '2024-06-02 05:41:16'),
(125, 26, 'NAP_XU', 2998, 1751720350, '2024-06-02 05:42:01'),
(126, 26, 'NAP_XU', 2998, 1764227607, '2024-06-02 05:42:11'),
(127, 26, 'NAP_XU', 2998, 1800410085, '2024-06-02 05:42:27'),
(128, 26, 'NAP_XU', 2998, 1787235387, '2024-06-02 05:43:30'),
(129, 26, 'NAP_XU', 999, 1738895460, '2024-06-02 05:45:01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL COMMENT ' ID duy nhất của người dùng.',
  `Username` varchar(255) NOT NULL COMMENT 'Tên đăng nhập của người dùng.',
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `Gender` varchar(10) DEFAULT 'Khác',
  `Birthday` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `coins` int(11) DEFAULT 0 COMMENT 'Số dư trong tài khoản người dùng.',
  `isDeleted` int(11) DEFAULT 0,
  `Roles` varchar(255) DEFAULT 'U',
  `lastLogin` bigint(20) DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `phone`, `FullName`, `Gender`, `Birthday`, `Address`, `coins`, `isDeleted`, `Roles`, `lastLogin`, `UpdatedAt`) VALUES
(2, 'user2', 'password2', 'user2@example.com', NULL, 'User Two', 'Khác', NULL, '456 XYZ Street', 5, 1, 'U', NULL, NULL),
(3, 'user3', 'password3', 'user3@example.com', NULL, 'User Three', 'Khác', NULL, '789 QRS Street', 300, 1, 'U', NULL, NULL),
(5, 'user5', 'password5', 'user5@example.com', NULL, 'User so 5', 'Nữ', NULL, '1213 UVW Street', 516, 1, 'U', NULL, '0000-00-00 00:00:00'),
(17, 'dung12', '$2b$10$QL8rfpNct1bjUHXvnFY6OO4JHp46sgaIpxBoa1iY42Q5pR6W8FGQC', 'dung12@gmail.com', NULL, 'Dương Dũng', 'Khác', NULL, NULL, 0, 1, 'U', NULL, NULL),
(18, 'dung1', '$2b$10$YcJM/oyxnQ40N43jmmn.MuHx3oJ7tFF53sp1Si7yzfWB7H/.HfjvS', 'dung1@gmail.com', NULL, 'Dương Dũng', 'Khác', NULL, NULL, 0, 0, 'U', NULL, NULL),
(20, 'ddung123', '$2b$10$6UtNlA0f2UZMnO/eTO.CLuv9LJbuy1TYsggBQNFbJsbRuvTopILTW', 'ddung123@gmail.com', '0011223344', 'Dương Văn Dũng', 'Nam', '5/12/2023', NULL, 73, 0, 'A', NULL, '0000-00-00 00:00:00'),
(26, 'duongvandung2k3', '$2b$10$JcjFtTJilnqQ54HwZVyJvuOzn2QkXiuZeaWlSffhwe7oOFParL.M2', 'duongvandung2k3@gmail.com', '0865268360', 'Dương Văn Dũng', 'Nam', '13/10/2003', NULL, 12991, 0, 'U', NULL, '0000-00-00 00:00:00'),
(27, 'a', '$2b$10$QbsPPUuc2xcKXr2zA16frOW3J51vPYqvypiNrryc8D19HBhuz6qE.', 'a@d', '01232', 'Nguyen Van A', 'Nam', '2/01/2003', NULL, 0, 0, 'U', NULL, '0000-00-00 00:00:00'),
(28, 'admin', '$2b$10$Mxs9VtcwBBNOGxvJx9j90uAPaF6c4irhXGQxGYPZ0cH9wfYfHZOFO', 'admin@gmail.com', NULL, 'Admin', 'Khác', NULL, NULL, 0, 0, 'A', NULL, NULL),
(29, 'ddung203.contact', '$2b$10$zXql.GWH6432IkVcSlKJT.0c3GxH/RqExe2rp1/I4ypNAcy9M/rw.', 'ddung203.contact@gmail.com', NULL, 'Dương Dương', 'Nam', '29/05/2024', NULL, 1500, 0, 'U', NULL, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `VoucherID` int(11) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `Amount` int(11) NOT NULL DEFAULT 20,
  `ExpiryTime` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`VoucherID`, `Code`, `Amount`, `ExpiryTime`) VALUES
(3, 'D4T', 1500, '2024-11-14 17:00:00'),
(4, 'SPRINGSALE', 2525, '2024-04-29 17:00:00'),
(5, 'HOLIDAY25', 2500, '2024-12-24 17:00:00'),
(8, 'VOUCHER20', 2000, '2024-03-13 07:12:59'),
(9, 'SAVE10', 1000, '2023-03-13 07:12:59'),
(12, 'D4TT', 500, '2024-11-14 17:00:00');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bookmarks`
--
ALTER TABLE `bookmarks`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`BookID`);

--
-- Chỉ mục cho bảng `book_favorited`
--
ALTER TABLE `book_favorited`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `book_tracking`
--
ALTER TABLE `book_tracking`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `fk_users_comments` (`UserID`),
  ADD KEY `fk_books_comments` (`BookID`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`NotificationID`),
  ADD KEY `fk_users_notifications` (`UserID`);

--
-- Chỉ mục cho bảng `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `fk_users_transactions` (`UserID`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Chỉ mục cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`VoucherID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bookmarks`
--
ALTER TABLE `bookmarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `books`
--
ALTER TABLE `books`
  MODIFY `BookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT cho bảng `book_favorited`
--
ALTER TABLE `book_favorited`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT cho bảng `book_tracking`
--
ALTER TABLE `book_tracking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=273;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT COMMENT ' ID duy nhất của người dùng.', AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `VoucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_books_comments` FOREIGN KEY (`BookID`) REFERENCES `books` (`BookID`),
  ADD CONSTRAINT `fk_users_comments` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `fk_users_notifications` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);

--
-- Các ràng buộc cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk_users_transactions` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
