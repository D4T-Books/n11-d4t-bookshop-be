-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 16, 2024 lúc 05:09 PM
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
-- Cấu trúc bảng cho bảng `books`
--

CREATE TABLE `books` (
  `BookID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `CoverURL` text DEFAULT 'https://salt.tikicdn.com/cache/280x280/ts/product/cb/ea/f1/54614e3e1c9d5de1e7cd6b1be97bbbb4.jpg.webp',
  `Author` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Categories` varchar(255) DEFAULT NULL,
  `Price` int(11) DEFAULT 1000,
  `Quantity` int(11) DEFAULT 10 COMMENT 'Số lượng có sẵn trong kho.\r\n',
  `Views` int(11) DEFAULT 0,
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `books`
--

INSERT INTO `books` (`BookID`, `Title`, `CoverURL`, `Author`, `Description`, `Categories`, `Price`, `Quantity`, `Views`, `content`) VALUES
(11, 'Sapiens: A Brief History of Humankind', '', 'Yuval Noah Harari', 'A fascinating recount of the history of Homo sapiens, from the emergence of our species to the modern age.', 'History, Anthropology, Science', 200000, 20, 0, NULL),
(12, 'The Great Gatsby', '', 'F. Scott Fitzgerald', 'Set in the roaring twenties, this novel follows the mysterious Jay Gatsby and his pursuit of the American Dream.', 'Classic, Fiction, Romance', 150000, 15, 80, NULL),
(13, '1984', '', 'George Orwell', 'A dystopian novel set in a totalitarian regime where individuality is suppressed and surveillance is omnipresent.', 'Dystopian, Fiction, Politics', 180000, 18, 10, NULL),
(14, 'To Kill a Mockingbird', '', 'Harper Lee', 'This Pulitzer Prize-winning novel explores themes of racial injustice and moral growth in the American South.', 'Classic, Fiction, Legal Drama', 170000, 17, 20, NULL),
(15, 'The Catcher in the Rye', '', 'J.D. Salinger', 'A coming-of-age novel narrated by the disillusioned teenager Holden Caulfield, reflecting on adolescence and the adult world.', 'Classic, Fiction, Coming-of-age', 160000, 16, 0, NULL),
(16, 'Harry Potter and the Philosopher\'s Stone', '', 'J.K. Rowling', 'The first book in the Harry Potter series, following the young wizard Harry Potter as he discovers his magical heritage.', 'Fantasy, Fiction, Magic', 220000, 22, 100, 'THE VANISHING GLASS\n\nNearly ten years had passed since the Dursleys had woken up to find their nephew on the front step, but Privet Drive had hardly changed at all. The sun rose on the same tidy front gardens and lit up the brass number four on the Dursleys\' front door; it crept into their living\nroom, which was almost exactly the same as it had been on the night when Mr. Dursley had seen that fateful news report about the owls. Only the photographs on the mantelpiece really showed how much time had passed.\nTen years ago, there had been lots of pictures of what looked like a large pink beach ball wearing different-colored bonnets -- but Dudley Dursley was no longer a baby, and now the photographs showed a large blond boy riding his first bicycle, on a carousel at the fair, playing a computer game with his father, being hugged and kissed by his mother. The room held no sign at all that another boy lived in the house, too.\n\nYet Harry Potter was still there, asleep at the moment, but not for\nlong. His Aunt Petunia was awake and it was her shrill voice that made\n \nthe first noise of the day. \"Up! Get up! Now!\"\nHarry woke with a start. His aunt rapped on the door again.\n\n\"Up!\" she screeched. Harry heard her walking toward the kitchen and then the sound of the frying pan being put on the stove. He rolled onto his\nback and tried to remember the dream he had been having. It had been a good one. There had been a flying motorcycle in it. He had a funny feeling he\'d had the same dream before.\n\nHis aunt was back outside the door. \"Are you up yet?\" she demanded. \"Nearly,\" said Harry.\n\"Well, get a move on, I want you to look after the bacon. And don\'t you dare let it burn, I want everything perfect on Duddy\'s birthday.\"\nHarry groaned.\n\n\"What did you say?\" his aunt snapped through the door. \"Nothing, nothing...\"\nDudley\'s birthday -- how could he have forgotten? Harry got slowly out of bed and started looking for socks. He found a pair under his bed and, after pulling a spider off one of them, put them on. Harry was used to spiders, because the cupboard under the stairs was full of them, and that was where he slept.\n\nWhen he was dressed he went down the hall into the kitchen. The table was almost hidden beneath all Dudley\'s birthday presents. It looked as\n \nthough Dudley had gotten the new computer he wanted, not to mention the second television and the racing bike. Exactly why Dudley wanted a racing bike was a mystery to Harry, as Dudley was very fat and hated exercise -- unless of course it involved punching somebody. Dudley\'s favorite punching bag was Harry, but he couldn\'t often catch him. Harry didn\'t look it, but he was very fast.\n\nPerhaps it had something to do with living in a dark cupboard, but Harry had always been small and skinny for his age. He looked even smaller and skinnier than he really was because all he had to wear were old clothes\nof Dudley\'s, and Dudley was about four times bigger than he was. Harry had a thin face, knobbly knees, black hair, and bright green eyes. He wore round glasses held together with a lot of Scotch tape because of\nall the times Dudley had punched him on the nose. The only thing Harry liked about his own appearance was a very thin scar on his forehead that was shaped like a bolt of lightning. He had had it as long as he could remember, and the first question he could ever remember asking his Aunt Petunia was how he had gotten it.\n\"In the car crash when your parents died,\" she had said. \"And don\'t ask questions.\"\n\nDon\'t ask questions -- that was the first rule for a quiet life with the Dursleys.\n\nUncle Vernon entered the kitchen as Harry was turning over the bacon. \"Comb your hair!\" he barked, by way of a morning greeting.\nAbout once a week, Uncle Vernon looked over the top of his newspaper and\nshouted that Harry needed a haircut. Harry must have had more haircuts than the rest of the boys in his class put\ntogether, but it made no difference, his hair simply grew that way --\n \nall over the place.\n\nHarry was frying eggs by the time Dudley arrived in the kitchen with his mother. Dudley looked a lot like Uncle Vernon. He had a large pink face, not much neck, small, watery blue eyes, and thick blond hair that lay smoothly on his thick, fat head. Aunt Petunia often said that Dudley looked like a baby angel -- Harry often said that Dudley looked like a\npig in a wig.\n\nHarry put the plates of egg and bacon on the table, which was difficult as there wasn\'t much room. Dudley, meanwhile, was counting his presents.\nHis face fell.\n\n\"Thirty-six,\" he said, looking up at his mother and father. \"That\'s two less than last year.\"\n\"Darling, you haven\'t counted Auntie Marge\'s present, see, it\'s here under this big one from Mommy and Daddy.\"\n\n\"All right, thirty-seven then,\" said Dudley, going red in the face.\nHarry, who could see a huge Dudley tantrum coming on, began wolfing down\nhis bacon as fast as possible in case Dudley turned the table over.\n\nAunt Petunia obviously scented danger, too, because she said quickly, \"And we\'ll buy you another two presents while we\'re out today. How\'s that, popkin? Two more presents. Is that all right\'\'\n\nDudley thought for a moment. It looked like hard work. Finally he said slowly, \"So I\'ll have thirty ... thirty...\"\n\n\"Thirty-nine, sweetums,\" said Aunt Petunia.\n\n\"Oh.\" Dudley sat down heavily and grabbed the nearest parcel. \"All right\n \nthen.\"\n\nUncle Vernon chuckled. \"Little tyke wants his money\'s worth, just like his father. \'Atta boy, Dudley!\" He ruffled Dudley\'s hair.\n\nAt that moment the telephone rang and Aunt Petunia went to answer it while Harry and Uncle Vernon watched Dudley unwrap the racing bike, a video camera, a remote control airplane, sixteen new computer games, and a VCR. He was ripping the paper off a gold wristwatch when Aunt Petunia came back from the telephone looking both angry and worried.\n\n\"Bad news, Vernon,\" she said. \"Mrs. Figg\'s broken her leg. She can\'t take him.\" She jerked her head in Harry\'s direction.\nDudley\'s mouth fell open in horror, but Harry\'s heart gave a leap. Every year on Dudley\'s birthday, his parents took him and a friend out for the day, to adventure parks, hamburger restaurants, or the movies. Every year, Harry was left behind with Mrs. Figg, a mad old lady who lived two streets away. Harry hated it there. The whole house smelled of cabbage and Mrs. Figg made him look at photographs of all the cats she\'d ever owned.\n\n\"Now what?\" said Aunt Petunia, looking furiously at Harry as though he\'d planned this. Harry knew he ought to feel sorry that Mrs. Figg had\nbroken her leg, but it wasn\'t easy when he reminded himself it would be a whole year before he had to look at Tibbles, Snowy, Mr. Paws, and Tufty again.\n\n\"We could phone Marge,\" Uncle Vernon suggested. \"Don\'t be silly, Vernon, she hates the boy.\"\nThe Dursleys often spoke about Harry like this, as though he wasn\'t there -- or rather, as though he was something very nasty that couldn\'t understand them, like a slug.\n \n\"What about what\'s-her-name, your friend -- Yvonne?\" \"On vacation in Majorca,\" snapped Aunt Petunia.\n\"You could just leave me here,\" Harry put in hopefully (he\'d be able to watch what he wanted on television for a change and maybe even have a go\non Dudley\'s computer).\n\nAunt Petunia looked as though she\'d just swallowed a lemon. \"And come back and find the house in ruins?\" she snarled.\n\"I won\'t blow up the house,\" said Harry, but they weren\'t listening.\n\n\"I suppose we could take him to the zoo,\" said Aunt Petunia slowly, \"... and leave him in the car.	\"\n\n\"That car\'s new, he\'s not sitting in it alone.	\"\n\nDudley began to cry loudly. In fact, he wasn\'t really crying -- it had been years since he\'d really cried -- but he knew that if he screwed up his face and wailed, his mother would give him anything he wanted.\n\n\"Dinky Duddydums, don\'t cry, Mummy won\'t let him spoil your special day!\" she cried, flinging her arms around him.\n\n\"I... don\'t... want... him... t-t-to come!\" Dudley yelled between huge, pretend sobs. \"He always sp- spoils everything!\" He shot Harry a nasty grin through the gap in his mother\'s arms.\n\nJust then, the doorbell rang -- \"Oh, good Lord, they\'re here!\" said Aunt Petunia frantically -- and a moment later, Dudley\'s best friend, Piers Polkiss, walked in with his mother. Piers was a scrawny boy with a face\n \nlike a rat. He was usually the one who held people\'s arms behind their backs while Dudley hit them. Dudley stopped pretending to cry at once.\n\nHalf an hour later, Harry, who couldn\'t believe his luck, was sitting in the back of the Dursleys\' car with Piers and Dudley, on the way to the zoo for the first time in his life. His aunt and uncle hadn\'t been able to think of anything else to do with him, but before they\'d left, Uncle Vernon had taken Harry aside.\n\n\"I\'m warning you,\" he had said, putting his large purple face right up close to Harry\'s, \"I\'m warning you now, boy -- any funny business, anything at all -- and you\'ll be in that cupboard from now until Christmas.\"\n\n\"I\'m not going to do anything,\" said Harry, \"honestly.. But Uncle Vernon didn\'t believe him. No one ever did.\nThe problem was, strange things often happened around Harry and it was just no good telling the Dursleys he didn\'t make them happen.\nOnce, Aunt Petunia, tired of Harry coming back from the barbers looking as though he hadn\'t been at all, had taken a pair of kitchen scissors\nand cut his hair so short he was almost bald except for his bangs, which she left \"to hide that horrible scar.\" Dudley had laughed himself silly\nat Harry, who spent a sleepless night imagining school the next day, where he was already laughed at for his baggy clothes and taped glasses.\nNext morning, however, he had gotten up to find his hair exactly as it\nhad been before Aunt Petunia had sheared it off He had been given a week in his cupboard for this, even though he had tried to explain that he couldn\'t explain how it had grown back so quickly.\n\nAnother time, Aunt Petunia had been trying to force him into a revolting old sweater of Dudley\'s (brown with orange puff balls) -- The harder she tried to pull it over his head, the smaller it seemed to become, until\n \nfinally it might have fitted a hand puppet, but certainly wouldn\'t fit Harry. Aunt Petunia had decided it must have shrunk in the wash and, to his great relief, Harry wasn\'t punished.\n\nOn the other hand, he\'d gotten into terrible trouble for being found on the roof of the school kitchens. Dudley\'s gang had been chasing him as usual when, as much to Harry\'s surprise as anyone else\'s, there he was sitting on the chimney. The Dursleys had received a very angry letter from Harry\'s headmistress telling them Harry had been climbing school buildings. But all he\'d tried to do (as he shouted at Uncle Vernon through the locked door of his cupboard) was jump behind the big trash cans outside the kitchen doors. Harry supposed that the wind must have caught him in mid- jump.\n\nBut today, nothing was going to go wrong. It was even worth being with Dudley and Piers to be spending the day somewhere that wasn\'t school, his cupboard, or Mrs. Figg\'s cabbage-smelling living room.\n\nWhile he drove, Uncle Vernon complained to Aunt Petunia. He liked to complain about things: people at work, Harry, the council, Harry, the bank, and Harry were just a few of his favorite subjects. This morning, it was motorcycles.\n\n\"... roaring along like maniacs, the young hoodlums,\" he said, as a motorcycle overtook them.\n\nI had a dream about a motorcycle,\" said Harry, remembering suddenly. \"It was flying.\"\n\nUncle Vernon nearly crashed into the car in front. He turned right around in his seat and yelled at Harry, his face like a gigantic beet with a mustache: \"MOTORCYCLES DON\'T FLY!\"\n\nDudley and Piers sniggered.\n \nI know they don\'t,\" said Harry. \"It was only a dream.\"\n\nBut he wished he hadn\'t said anything. If there was one thing the Dursleys hated even more than his asking questions, it was his talking about anything acting in a way it shouldn\'t, no matter if it was in a dream or even a cartoon -- they seemed to think he might get dangerous ideas.\n\nIt was a very sunny Saturday and the zoo was crowded with families. The Dursleys bought Dudley and Piers large chocolate ice creams at the entrance and then, because the smiling lady in the van had asked Harry what he wanted before they could hurry him away, they bought him a cheap\nlemon ice pop. It wasn\'t bad, either, Harry thought, licking it as they watched a gorilla scratching its head who looked remarkably like Dudley, except that it wasn\'t blond.\nHarry had the best morning he\'d had in a long time. He was careful to walk a little way apart from the Dursleys so that Dudley and Piers, who were starting to get bored with the animals by lunchtime, wouldn\'t fall back on their favorite hobby of hitting him. They ate in the zoo restaurant, and when Dudley had a tantrum because his knickerbocker glory didn\'t have enough ice cream on top, Uncle Vernon bought him another one and Harry was allowed to finish the first.\n\nHarry felt, afterward, that he should have known it was all too good to last.\n\nAfter lunch they went to the reptile house. It was cool and dark in there, with lit windows all along the walls. Behind the glass, all sorts\nof lizards and snakes were crawling and slithering over bits of wood and stone. Dudley and Piers wanted to see huge, poisonous cobras and thick, man-crushing pythons. Dudley quickly found the largest snake in the place. It could have wrapped its body twice around Uncle Vernon\'s car and crushed it into a trash can -- but at the moment it didn\'t look in\n \nthe mood. In fact, it was fast asleep.\n\nDudley stood with his nose pressed against the glass, staring at the glistening brown coils.\n\n\"Make it move,\" he whined at his father. Uncle Vernon tapped on the glass, but the snake didn\'t budge.\n\n\"Do it again,\" Dudley ordered. Uncle Vernon rapped the glass smartly with his knuckles, but the snake just snoozed on.\n\"This is boring,\" Dudley moaned. He shuffled away.\n\nHarry moved in front of the tank and looked intently at the snake. He wouldn\'t have been surprised if it had died of boredom itself -- no company except stupid people drumming their fingers on the glass trying to disturb it all day long. It was worse than having a cupboard as a bedroom, where the only visitor was Aunt Petunia hammering on the door to wake you up; at least he got to visit the rest of the house.\n\nThe snake suddenly opened its beady eyes. Slowly, very slowly, it raised its head until its eyes were on a level with Harry\'s.\n\nIt winked.\n\nHarry stared. Then he looked quickly around to see if anyone was watching. They weren\'t. He looked back at the snake and winked, too.\n\nThe snake jerked its head toward Uncle Vernon and Dudley, then raised its eyes to the ceiling. It gave Harry a look that said quite plainly:\n\"I get that all the time.\n\n\"I know,\" Harry murmured through the glass, though he wasn\'t sure the snake could hear him. \"It must be really annoying.\"\n \nThe snake nodded vigorously.\n\n\"Where do you come from, anyway?\" Harry asked.\n\nThe snake jabbed its tail at a little sign next to the glass. Harry peered at it.\n\nBoa Constrictor, Brazil. \"Was it nice there?\"\nThe boa constrictor jabbed its tail at the sign again and Harry read on: This specimen was bred in the zoo. \"Oh, I see -- so you\'ve never been to Brazil?\"\n\nAs the snake shook its head, a deafening shout behind Harry made both of them jump.\n\n\"DUDLEY! MR. DURSLEY! COME AND LOOK AT THIS SNAKE! YOU WON\'T BELIEVE\nWHAT IT\'S DOING!\"\n\nDudley came waddling toward them as fast as he could.\n\n\"Out of the way, you,\" he said, punching Harry in the ribs. Caught by surprise, Harry fell hard on the concrete floor. What came next happened so fast no one saw how it happened -- one second, Piers and Dudley were leaning right up close to the glass, the next, they had leapt back with howls of horror.\n\nHarry sat up and gasped; the glass front of the boa constrictor\'s tank had vanished. The great snake was uncoiling itself rapidly, slithering out onto the floor. People throughout the reptile house screamed and started running for the exits.\n \nAs the snake slid swiftly past him, Harry could have sworn a low, hissing voice said, \"Brazil, here I come.... Thanksss, amigo.\"\nThe keeper of the reptile house was in shock.\n\n\"But the glass,\" he kept saying, \"where did the glass go?\"\n\nThe zoo director himself made Aunt Petunia a cup of strong, sweet tea while he apologized over and over again. Piers and Dudley could only gibber. As far as Harry had seen, the snake hadn\'t done anything except snap playfully at their heels as it passed, but by the time they were\nall back in Uncle Vernon\'s car, Dudley was telling them how it had nearly bitten off his leg, while Piers was swearing it had tried to squeeze him to death. But worst of all, for Harry at least, was Piers calming down enough to say, \"Harry was talking to it, weren\'t you, Harry?\"\n\nUncle Vernon waited until Piers was safely out of the house before starting on Harry. He was so angry he could hardly speak. He managed to say, \"Go -- cupboard -- stay -- no meals,\" before he collapsed into a chair, and Aunt Petunia had to run and get him a large brandy.\n\nHarry lay in his dark cupboard much later, wishing he had a watch. He didn\'t know what time it was and he couldn\'t be sure the Dursleys were asleep yet. Until they were, he couldn\'t risk sneaking to the kitchen\nfor some food.\n\nHe\'d lived with the Dursleys almost ten years, ten miserable years, as long as he could remember, ever since he\'d been a baby and his parents had died in that car crash. He couldn\'t remember being in the car when his parents had died. Sometimes, when he strained his memory during long\nhours in his cupboard, he came up with a strange vision: a blinding flash of green light and a burn- ing pain on his forehead. This, he\n \nsupposed, was the crash, though he couldn\'t imagine where all the green light came from. He couldn\'t remember his parents at all. His aunt and uncle never spoke about them, and of course he was forbidden to ask questions. There were no photographs of them in the house.\n\nWhen he had been younger, Harry had dreamed and dreamed of some unknown\nrelation coming to take him away, but it had never happened; the Dursleys were his only family. Yet sometimes he thought (or maybe hoped)\nthat strangers in the street seemed to know him. Very strange strangers they were, too. A tiny man in a violet top hat had bowed to him once while out shopping with Aunt Petunia and Dudley. After asking Harry furiously if he knew the man, Aunt Petunia had rushed them out of the shop without buying anything. A wild-looking old woman dressed all in green had waved merrily at him once on a bus. A bald man in a very long purple coat had actually shaken his hand in the street the other day and then walked away without a word. The weirdest thing about all these people was the way they seemed to vanish the second Harry tried to get a closer look.\n\nAt school, Harry had no one. Everybody knew that Dudley\'s gang hated that odd Harry Potter in his baggy old clothes and broken glasses, and nobody liked to disagree with Dudley\'s gang.\n'),
(17, 'The Hobbit', '', 'J.R.R. Tolkien', 'A fantasy novel that follows the adventures of Bilbo Baggins as he embarks on a quest to reclaim the Lonely Mountain from the dragon Smaug.', 'Fantasy, Fiction, Adventure', 210000, 21, 10, NULL),
(18, 'Pride and Prejudice', '', 'Jane Austen', 'A classic romance novel that follows the tumultuous relationship between Elizabeth Bennet and Mr. Darcy in Georgian England.', 'Classic, Fiction, Romance', 190000, 19, 0, NULL),
(19, 'The Lord of the Rings', '', 'J.R.R. Tolkien', 'An epic fantasy trilogy that chronicles the journey of Frodo Baggins to destroy the One Ring and defeat the Dark Lord Sauron.', 'Fantasy, Fiction, Adventure', 250000, 25, 90, NULL),
(20, 'The Alchemist', '', 'Paulo Coelho', 'A philosophical novel following a young Andalusian shepherd named Santiago as he embarks on a journey to fulfill his personal legend.', 'Philosophy, Fiction, Adventure', 230000, 23, 0, NULL),
(21, 'The Picture of Dorian Gray', '', 'Oscar Wilde', 'A novel about a young man who remains youthful while a portrait of him ages.', 'Classic, Fiction, Gothic', 200000, 20, 0, NULL),
(22, 'The Odyssey', '', 'Homer', 'An epic poem that follows the hero Odysseus as he attempts to return home after the Trojan War.', 'Epic, Poetry, Adventure', 180000, 18, 0, NULL),
(23, 'Moby-Dick', '', 'Herman Melville', 'A novel about the captain of a whaling ship, Ahab, and his relentless pursuit of the white whale, Moby Dick.', 'Classic, Fiction, Adventure', 220000, 22, 0, NULL),
(24, 'War and Peace', '', 'Leo Tolstoy', 'A historical novel that chronicles the lives of Russian aristocrats during the Napoleonic Wars.', 'Classic, Fiction, Historical', 250000, 25, 0, NULL),
(25, 'Brave New World', '', 'Aldous Huxley', 'A dystopian novel set in a future world where technology and social control have created a stable society.', 'Dystopian, Fiction, Science Fiction', 210000, 21, 0, NULL),
(26, 'Crime and Punishment', '', 'Fyodor Dostoevsky', 'A psychological novel that explores the moral dilemmas faced by a young student named Raskolnikov after he commits a murder.', 'Classic, Fiction, Psychological', 190000, 19, 0, NULL),
(27, 'Frankenstein', '', 'Mary Shelley', 'A novel about a scientist who creates a grotesque creature in an unorthodox scientific experiment.', 'Classic, Fiction, Gothic', 170000, 17, 0, NULL),
(28, 'The Count of Monte Cristo', '', 'Alexandre Dumas', 'A tale of betrayal, revenge, and redemption, following the journey of Edmond Dantès.', 'Classic, Fiction, Adventure', 230000, 23, 0, NULL),
(29, 'The Divine Comedy', '', 'Dante Alighieri', 'An epic poem that depicts the journey of the narrator through Hell, Purgatory, and Paradise.', 'Epic, Poetry, Allegory', 200000, 20, 0, NULL),
(30, 'Don Quixote', '', 'Miguel de Cervantes', 'A satirical novel about an aging knight who becomes delusional and sets out to revive chivalry.', 'Classic, Fiction, Satire', 240000, 24, 0, NULL),
(31, 'One Hundred Years of Solitude', '', 'Gabriel García Márquez', 'A landmark novel that tells the multi-generational story of the Buendía family in the fictional town of Macondo.', 'Magical Realism, Fiction, Family Saga', 260000, 26, 0, NULL),
(32, 'The Brothers Karamazov', '', 'Fyodor Dostoevsky', 'A philosophical novel that explores the moral and spiritual struggles of three brothers.', 'Classic, Fiction, Philosophical', 270000, 27, 0, NULL),
(33, 'Anna Karenina', '', 'Leo Tolstoy', 'A tragic love story set against the backdrop of Russian society in the 19th century.', 'Classic, Fiction, Romance', 210000, 21, 0, NULL),
(34, 'The Trial', '', 'Franz Kafka', 'A surreal novel that follows the protagonist Josef K. as he is arrested and prosecuted by a mysterious authority.', 'Classic, Fiction, Surreal', 180000, 18, 0, NULL),
(35, 'The Grapes of Wrath', '', 'John Steinbeck', 'A novel that follows the Joad family as they journey from Oklahoma to California during the Great Depression.', 'Classic, Fiction, Historical', 220000, 22, 0, NULL),
(36, 'Les Misérables', '', 'Victor Hugo', 'A novel that follows the lives of several characters, particularly the ex-convict Jean Valjean, against the backdrop of 19th-century France.', 'Classic, Fiction, Historical', 230000, 23, 0, NULL),
(37, 'Wuthering Heights', '', 'Emily Brontë', 'A novel that tells the story of the passionate and destructive love between Heathcliff and Catherine Earnshaw.', 'Classic, Fiction, Gothic', 190000, 19, 0, NULL),
(38, 'The Canterbury Tales', '', 'Geoffrey Chaucer', 'A collection of stories told by pilgrims on their way to Canterbury Cathedral, offering a vivid portrait of medieval England.', 'Classic, Fiction, Poetry', 200000, 20, 0, NULL),
(39, 'The Scarlet Letter', '', 'Nathaniel Hawthorne', 'A novel set in 17th-century Puritan New England, exploring themes of sin, guilt, and redemption.', 'Classic, Fiction, Historical', 170000, 17, 0, NULL),
(40, 'Heart of Darkness', '', 'Joseph Conrad', 'A novella that explores the darkness at the heart of human nature through the journey of the protagonist, Marlow, into the Congo.', 'Classic, Fiction, Psychological', 180000, 18, 0, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `CommentID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `BookID` int(11) NOT NULL,
  `Content` varchar(255) NOT NULL,
  `CommentDate` datetime DEFAULT current_timestamp(),
  `isDeleted` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`CommentID`, `UserID`, `BookID`, `Content`, `CommentDate`, `isDeleted`) VALUES
(1, 1, 11, 'Great book! Highly recommended for anyone interested in history.', '2024-03-14 10:30:00', 0),
(2, 2, 13, 'This book is a must-read for understanding the dangers of totalitarianism.', '2024-03-13 15:45:00', 0),
(3, 3, 17, 'Holden Caulfield is such a relatable character. Love this book!', '2024-03-12 09:20:00', 0),
(4, 4, 10, 'The Hobbit is a classic adventure filled with excitement and wonder.', '2024-03-11 18:55:00', 0),
(5, 5, 20, 'The Alchemist has changed my perspective on life. Truly inspiring.', '2024-03-10 14:10:00', 0);

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
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `TransactionID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL COMMENT 'Liên kết với bảng Users để xác định người dùng tham gia giao dịch.',
  `TransactionType` int(11) DEFAULT NULL COMMENT 'Loại giao dịch (nạp xu, thanh toán mua sách, mượn sách, trả sách, v.v.).',
  `TransactionAmount` int(11) NOT NULL COMMENT ' Số tiền của giao dịch.',
  `TransactionDate` datetime DEFAULT current_timestamp() COMMENT 'Ngày thực hiện giao dịch.\r\n'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL COMMENT ' ID duy nhất của người dùng.',
  `Username` varchar(255) NOT NULL COMMENT 'Tên đăng nhập của người dùng.',
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `FullName` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Balance` int(11) DEFAULT 0 COMMENT 'Số dư trong tài khoản người dùng.',
  `isDeleted` int(11) DEFAULT 0,
  `Roles` varchar(255) DEFAULT 'U'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`UserID`, `Username`, `Password`, `Email`, `FullName`, `Address`, `Balance`, `isDeleted`, `Roles`) VALUES
(1, 'user1', 'password1', 'user1@example.com', 'User One', '123 ABC Street', 100, 0, 'U'),
(2, 'user2', 'password2', 'user2@example.com', 'User Two', '456 XYZ Street', 200, 0, 'U'),
(3, 'user3', 'password3', 'user3@example.com', 'User Three', '789 QRS Street', 300, 0, 'U'),
(4, 'user4', 'password4', 'user4@example.com', 'User Four', '1011 LMN Street', 400, 0, 'U'),
(5, 'user5', 'password5', 'user5@example.com', 'User Five', '1213 UVW Street', 500, 0, 'U'),
(6, 'user6', 'password6', 'user6@example.com', 'User Six', '1415 DEF Street', 600, 0, 'U'),
(7, 'user7', 'password7', 'user7@example.com', 'User Seven', '1617 GHI Street', 700, 0, 'U'),
(8, 'user8', 'password8', 'user8@example.com', 'User Eight', '1819 JKL Street', 800, 0, 'U'),
(9, 'user9', 'password9', 'user9@example.com', 'User Nine', '2021 OPQ Street', 900, 0, 'U'),
(10, 'user10', 'password10', 'user10@example.com', 'User Ten', '2223 RST Street', 1000, 0, 'U');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `vouchers`
--

CREATE TABLE `vouchers` (
  `VoucherID` int(11) NOT NULL,
  `Code` varchar(255) NOT NULL,
  `DiscountPercent` int(11) NOT NULL DEFAULT 20,
  `ExpiryTime` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `vouchers`
--

INSERT INTO `vouchers` (`VoucherID`, `Code`, `DiscountPercent`, `ExpiryTime`) VALUES
(1, 'VOUCHER20', 20, '2024-12-30 17:00:00'),
(2, 'SAVE10', 10, '2024-09-29 17:00:00'),
(3, 'DISCOUNT15', 15, '2024-11-14 17:00:00'),
(4, 'SPRINGSALE', 25, '2024-04-29 17:00:00'),
(5, 'HOLIDAY25', 25, '2024-12-24 17:00:00'),
(8, 'VOUCHER20', 20, '2024-03-13 07:12:59'),
(9, 'SAVE10', 10, '2024-03-13 07:12:59');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`BookID`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`CommentID`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`NotificationID`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`TransactionID`);

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
-- AUTO_INCREMENT cho bảng `books`
--
ALTER TABLE `books`
  MODIFY `BookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `CommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `NotificationID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `TransactionID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT COMMENT ' ID duy nhất của người dùng.', AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `VoucherID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
