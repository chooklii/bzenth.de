import React, { useContext } from "react";
import { Footer, Header } from "../../Components";
import { Helmet } from "react-helmet";
import { TranslationContext } from "../../helper";
import { Divider } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RustyRook = () => {
  const { getText } = useContext(TranslationContext);

  return (
    <div>
      <Helmet>
        <title>RustyRook - Chess Engine</title>
        <meta
          name="description"
          content="I learned Rust from scratch and developed a UCI Chess Engine which runs on Lichess. I share my development process within this Blog Post"
        />
        <meta name="keywords" content="Chess Engine, Lichess Bot, UCI Chess Protocol, Rust Chess Engine" />
        <meta property="og:title" content="Rusty Rook - Chess Engine" />
        <meta
          property="og:description"
          content="I learned Rust from scratch and developed a UCI Chess Engine which runs on Lichess. I share my development process within this Blog Post"
        />
        <meta property="canonical" content="https://bzenth.de/blog/rustyrook/" />
      </Helmet>
      <Header />
      <div className="page_classic blog_page">
        <div className="blog_date">written in June 2025</div>
        <div className="blog_translation">{getText("blog.onlyEnglish")}</div>
        <div className="blog_text">
          Back in January, I wanted to learn a new programming language. The final two languages within my selection were Go and Rust, where
          I chose Rust, as I wanted to learn something completely different from the other languages I was working with on
          a daily basis.
          <br />
          So I started reading
          the <a target="_blank" href="https://doc.rust-lang.org/book/title-page.html">
            Rust Book
          </a>,{" "}
          which I can recommend as a foundation to anyone who wants to learn Rust.
          <br />
          <br />
          Since I enjoy to play chess in my free time and to deepen my understanding of Rust, I started developing a chess
          engine called RustyRook using Rust at the end of February. It’s a great project, as chess engines are all
          about speed calculating as many positions as possible in the shortest time. While Donald Knuth is correct, that small
          optimizations should be ignored 97% of the time, as premature optimization is the root of all evil this does
          not apply to chess engines and thus provides a good contrast to most of the other software projects. In
          this text, I will share my experiences and explain how the engine works.
        </div>
        <Divider />
        <ol className="blog_content" role="list">
          <li>
            <a href="#uci">
              <span className="title">Universal Chess Interface (UCI)</span>
            </a>
          </li>
          <li>
            <a href="#board">
              <span className="title">Board and Bitboards</span>
            </a>
          </li>
          <li>
            <a href="#moves">
              <span className="title">Move Generation</span>
            </a>
            <ul>
              <li>
                <a href="#king_moves">
                  <span className="title">King and Knight</span>
                </a>
              </li>
              <li>
                <a href="#sliding_moves">
                  <span className="title">Sliding Pieces (Queen, Rook & Bishop)</span>
                </a>
              </li>
              <li>
                <a href="#pawn_moves">
                  <span className="title">Pawn</span>
                </a>
              </li>
              <li>
                <a href="#bugs_moves">
                  <span className="title">Finishing Touches</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#engine">
              <span className="title">Engine</span>
            </a>
            <ul>
              <li>
                <a href="#engine_alphabeta">
                  <span className="title">Alpha Beta Prunning</span>
                </a>
              </li>
              <li>
                <a href="#engine_transpositional">
                  <span className="title">Transpositional Table</span>
                </a>
              </li>
              <li>
                <a href="#engine_iterative">
                  <span className="title">Iterative Deepening</span>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#evaluation">
              <span className="title">Evaluation</span>
            </a>
          </li>
          <li>
            <a href="#outlook">
              <span className="title">General Thoughts and Outlook</span>
            </a>
            <ul>
              <li>
                <a href="#play">
                  <span className="title">Play and Source Code</span>
                </a>
              </li>
            </ul>
          </li>
        </ol>
        <h2 className="blog_heading" id="uci">
          Universal Chess Interface (UCI)
        </h2>
        To communicate with Lichess or other graphical user interfaces, the engine needs to implement standard chess
        protocols. RustyRook uses the{" "}
        <a target="_blank" href="https://gist.github.com/DOBRO/2592c6dad754ba67e6dcaec8c90165bf">
          UCI specification
        </a>. This protocol operates on a text-based level where both interface and engine communicate using plain text commands. Besides a
        set of basic commands for starting and ending games, the current state of play is provided to the engine using
        position commands like <br />
                <pre className="blog_code_pre">
        <code className="blog_code">position startpos moves g1f3 g8f6</code>
        </pre>
        This means the game started from the standard position, followed by the moves made so far 
        in <a target="_blank" href="https://en.wikipedia.org/wiki/Algebraic_notation_(chess)">
          algebraic notation
        </a>. Typically, this is followed by a 'go' command like
                <pre className="blog_code_pre">
        <code className="blog_code">go wtime 292858 btime 300000 movestogo 40</code>
        </pre>
        which tells the engine that it is its turn with additional context like the time left for both
        players (in milliseconds) and the moves to be played until the players reach the time control. The engine then 
        begins calculating the best move providing regular updates on its depth, time and evaluation until it replies with the move it wants to
        play.
                <pre className="blog_code_pre">
        <code className="blog_code">
          info depth 2 time 33 score cp 9 <br />
          info depth 4 time 68 score cp 10
          <br />
          ...
          <br />
          bestmove e2e3
        </code>
        </pre>
        <h2 className="blog_heading" id="board">
          Board and Bitboards
        </h2>
        A chessboard consists of 64 squares, which is a nice coincidence considering most computers operate on 64-bit architectures. 
        Given this chessboards can be effectively represented using Bitboards. A Bitboard is a collection of
        single Bits with a value of either 0 or 1. To represent a chessboard 64 of these Bits are combined.
        The board representation starts at the square a1 and ends at the square h8 (8th field is h1, not a8).
        <pre className="blog_code_pre">
        <code className="blog_code">00000000 11111111 00000000 00000000 00000000 00000000 00000000 00000000</code>
        </pre>
        Given that the bitboard displayed above represents the starting positions of all white pawns in a chess game. Since
        a bitboard is 64 bits in size it fits into a single CPU register. These Bitboards can and will be used for
        all kinds of representations. Below is the index mapping for all positions on the bitboard.
        <pre className="blog_code_pre">
          <code className="blog_code">
            56 57 58 59 60 61 62 63
            <br />
            48 49 50 51 52 53 54 55
            <br />
            40 41 42 43 44 45 46 47
            <br />
            32 33 34 35 36 37 38 39
            <br />
            24 25 26 27 28 29 30 31
            <br />
            16 17 18 19 20 21 22 23
            <br />
            &nbsp;8  9 10 11 12 13 14 15
            <br />
            &nbsp;0  1  2  3  4  5  6  7
          </code>
        </pre>

        Using Bitboards not only allows us to efficiently represent the chessboard it also enables us to use bitwise operations to perform all kinds of 
        operations very fast (like checking if either player uses a specific field).
        <h2 className="moves" id="uci">
          Move Generation
        </h2>
        I´m a fan of the concept 'make it work, make it right, make it fast'. Thus I initially implemented the move generation using two HashMaps (one for each color) with the 
        key being the current position on the board and the value the piece standing on it. The Piece was an Enum (not a Trait due to the known size of the enum at compile time and thus the 
        better performance of the enum) with some matching to calculate the right moves based on the type of the Enum. <br/>
        The moves were calculated by simply checking if the fields was occupied by the players color or the opponent. This can be seen on the image below. For the black bishop on d5 (Position 35)
        a calculation had to be made in all four possible directions and then check, if the field is empty (continue), used by the opponent (do not continue, but take this field as a possible move)
        or our own piece (do not continue). This continues until we stop or the end of the board is reached (e.g. the Position+7 calculation for the moves to the top left) <br/>
        
        <figure className="blog_figure_center">
          <img
            className="blog_movgen_old blog_img"
            aria-label="Picture of a Chess Board with all possible takes of a Bishop"
          />
        </figure>

        This approach works functionally, but it´s far from efficient. Thus more efficient methods were required. Using this method the generation of all moves at the beginning of a game 
        with a depth of 4 (4 moves into the future) took little more than 1s (197.281 positions). <br/><br/>

        So I improved my HashMap and changed it to Bitboards for each piece for each Color. This leaves us with 6 Bitboards (King, Queen, Rook, Knight, Bishop and Pawn) for each 
        color, as well as one bitboard for all pieces of one color to efficiently check if this color uses this field. I’ll explain how the move generation works using these Bitboards in
        the following.

        <h3 className="blog_heading" id="king_moves">
          King and Knight
        </h3>

        In Chess Programming it is crucial to precalculate as much as possible. The movement of the Knight is by far the easiest of all pieces. It has fixed moves for each field
        which we can calculate at startup. This results in an array of 64 Bitboards, each Bitboard representing the possible moves for a knight from a specific square. Using
        this we only need to take the Bitboard for the position the knight is on and take all 'true' Bits, where the Bit is 0 for the current players positions. This calculation 
        is simple math for the computer at which he is luckily super fast at.

        <pre className="blog_code_pre">
        <code className="blog_code">
          00000000 10001000 00100000 00000000 00000000 00000000 00000000 00000000 <br/>(Fields used by White) <br/>
          01010000 10001000 00000000 10001000 01010000 00000000 00000000 00000000 <br/>(Fields to possibly move to for Knight on Position 18) <br/>
          01010000 00000000 00000000 10001000 01010000 00000000 00000000 00000000 <br/>(Possible Moves for Knight)
          </code>        
          </pre>

        <figure className="blog_figure_center">
          <img
            className="blog_movgen_knight blog_img"
            aria-label="Picture of a Chess Board with all possible moves of a Knight"
          />
        </figure>

        The King works similarly to the knight, as all normal moves can be precalculated. It only has the twist, that we need to check all possible moves the opponent 
        can do and filter those out where we would move into check.
        
        More difficult for the king is checking if a Piece is pinned. The White Knight in the Figure below
        is not able to move, while the Bishop is able to move, but only on the diagonal towards the Black Bishop.
        This can be calculated using a concept called 'Opposite Ray-Directions' where we check for Bishop and Rook Movement starting from the Kings Position and then check if 
        the first figure we encounter is an opponent one with the correct movement (we are in check from this position), there is one figure of us in between (Piece is pinned), there is one figure 
        of the opponent not threatening us or two of ours (both nothing special).

      <figure className="blog_figure_center">
          <img
            className="blog_pinns blog_img"
            aria-label="Pinned Chess Pieces"
          />
        </figure>

        Additionally the possibility of castling needs to be added, which can be added to the current board as four boolean states (castle long and short for both colors) which 
        need to be updated whenever the king or rook have moved for the first time. 

        <h3 className="blog_heading" id="sliding_moves">
          Sliding Pieces (Queen, Rook & Bishop)
        </h3>

        While the Moves for the Knight and King are quite easy to implement the Sliding Pieces are much harder to implement. This is due to their movement, where they can stop 
        on all possible fields. The Movement of these three figures depends on the position of other pieces in their way. To precalculate the movement (and remove the not so 
        performant code previously described) we need to use a concept called <a href="https://www.chessprogramming.org/Magic_Bitboards" target="_blank">Magic Bitboards</a>. 
        <br/><br/>
        To pre-calculate all possible takes of the rook at a2 we need to consider all fields with a red circle. The last row can be ignored as if there is no figure blocking the rook 
        within the red circles we can possibly (still need to check if it is our figure) move to all fields.

        <figure className="blog_figure_center">
          <img
            className="blog_movgen_magic_bitboards_one blog_img"
            aria-label="Possible Blockers for a Rook when calculating a Magic Bitboard"
          />
        </figure>

        It is not relevant for our Magic Bitboards if there is a Knight or the King on A7. This leaves us with 2^N (In this case N = 11, as there are 11 possible blockers) 2048 possible different blockers for this field. We could
        precalculate all these moves and use the bitboard of used fields as an index. This implementation has some issues like its fairly inefficient index. (Taking the complete board 
        with all its 64 bits as an index would result in a total size in the Petabytes)<br/>
        Luckily it can be improved more by using a hash function. While 'normal' hash tables need to work with all data we 
        just need <a target="_blank" href="https://en.wikipedia.org/wiki/Perfect_hash_function">Perfect Hash</a> for all our 2048 possible values. The idea is taking the Bitboard where 
        relevant blockers (red circles in the image) and used positions are true and calculating it with our hash value (works similar to the knight moves previously described, but here 
        we precaclulate the possible blocker fields for a2). 
        In addition we shift the bits of the hash by 64 minus the amount of blockers as we only need this amount of bits to represent our possible hash index.

        <pre className="blog_code_pre">
        <code className="blog_code">
          blocking_fields_bitboard * hash_key {">>"} (64 - amount_of_blockers)
        </code>
        </pre>

        As this is not fancy enough the real magic happens when finding these hash_keys (often called magic numbers). They can only be found by simple brute-force trial and error
        (Even Stockfish Brute Forces these values after startup).
        The only suitable option to find these magic numbers is trying a number and discarding it, if it does not result in a perfect hash. This process can be accelerated by shifting 
        less and thus decreasing the propability of hash collitions. All this (as well as generating the possible blockers for each field) is done at startup. (Can you feel the Magic in the Air? :D) <br/><br/>
        For RustyRook I calculated these Magic Numbers once and hard coded them into the project thus not needing to brute force them all the time. Using these Hashes we now only need to 
        do simple mathematic calculations to quickly generate the possible moves for a sliding piece on a given square.
        This works the same for both Bishop and Rook with the queen being a combination of both (Not using extra hashes - just OR-Operate Bishop and Rook).

        <pre className="blog_code_pre nocenter">
        <code className="blog_code">
          1. Get Relevant Blockers for the field (a2)<br/>
          2. AND Operate them with the current positions<br/>
          3. Calculate the Hash (displayed above)<br/>
          4. Get the possible moves for this Hash out of all 2048 possible values
        </code>
        </pre>

        Implementing this feature correctly was one of the most difficult algorithms I have ever implemented which cost me some time, nerves and evenings debugging this functionality. If you are more interested
        in how Magic Bitboards work check the Chess Programming Wiki linked at the beginning of this chapter, as this explaination only scratches the surface of Magic Bitboards.



        <h3 className="blog_heading" id="pawn_moves">
          Pawn
        </h3>

        The Pawn - even though its the Piece with the lowest value - has some special features. The initial two moves can be implemented by checking the current column (White: 2, Black: 7)
        of the pawn. Same with Promotion where if the Pawn is on the 2nd to last column and moves forward we need to consider 4 possible moves (Promotion to Queen, Rook, Bishop and Knight).

        En Passant is more difficult, as it is dependent on the previous movement of our opponent. Thus we need to add an additional field to our chessboard whenever a player moves a Pawn 
        two fields forward so we can check for a possible en passant on the next move. <br/>
        When looking at the chessboard below: The last move black played was c7c5 and thus giving white the opportunity to en passant capture the Pawn. Should White capture the Pawn en passant? 

        <figure className="blog_figure_center">
          <img
            className="blog_en_passant_check blog_img"
            aria-label="Chessboard where making an en passant take would result in our king being in check"
          />
        </figure>

        No, as this is an illegal move leaving his own king checked by the rook on h5. Given this we additionally need to check (when capturing a pawn en passant) that we dont put our 
        own king into check while doing so. This is done using the 'Opposite Ray-Directions' while ignoring both pawns.

        <h3 className="blog_heading" id="bugs_moves">
          Finishing Touches
        </h3>

        Given all this our Chessboard Object contains the following fields:

        <pre className="blog_code_pre nocenter">
        <code className="blog_code">
          
          used_positions: [Bitboard; 2], <br/>
          figures: [[Bitboard; 6]; 2], <br/>
          current_move: Color, <br/>
          en_passant: Option{"<usize>"}, <br/>
          castle: Castle, <br/>
        </code> 
        </pre>

        Making sure the Move Generation works 100% correct is hard and I had multiple hard to find bugs. Thats why I wrote more than 60 Unit Tests for all Edge Cases to be confident when
        changing the implementation of some functionality. To all people interested in developing their own Chess Engine I can only recommend using the Chess Positions provided in 
        the <a href="https://www.chessprogramming.org/Perft_Results" target="_blank">Chess Programming Wiki</a>. These positions contain all kinds of edge cases and the wiki provides the 
        total amount of possible moves. <br/>
        I also used StockFish who has a 'perft' command providing the total count of moves after each move for a given depth. This data can be used to slowly find the move 
        where the engine is doing wrong. Without this it would be even harder to find the possible bug, as some bugs only resulted in a difference of ~60 possible Moves for a given depth 
        with a total count of 4.085.662 possible moves. <br/>
        Changing the move generation from calculating them in time to using Magic Bitboards and precalculating all possible values reduced the time to generate all possible moves from the 
        previously described ~1s (1.14s) down to just over 70ms in dev mode and 10ms when using the release build with all optimizations with which I am quite happy with.
      
        <h2 className="blog_heading" id="engine">
          Engine
        </h2>
      
        The Heart of RustyRook is its engine calculating the best possible move. The simplest possible chess engine generates all moves to a given depth and then 
        uses the <a href="https://www.chessprogramming.org/Minimax" target="_blank">Minimax</a> algorithm to find the best possible move. Minimax works by assuming that 
        every player plays the best possible move. White tries to Maximize the evaluation of the current position, while Black tries to Minimize the evaluation. <br/>

        Minimax starts at the bottom of the tree and calculates an evaluation for the current position of the game. It then assumes that Black (who´s goal it is to minimize the score)
        will play the move, that results in the best evaluation for him, which is -1 on the left side and -2 on the right side. Given Whites goal to maximize the value white needs to 
        play the move, which results in -1, not -2, thus while will play this move (red line)

        <figure className="blog_figure_center">
          <img
            className="blog_minimax blog_img"
            aria-label="Basic Minimax Algoritm"
          />
        </figure>

        This works fine, but has some issues. The biggest issue is that we could end completely missjudging the situation. This could be when we stop at a moment where black captures 
        whites rook with his queen which white will recapture in his next move. The evaluation could think that this is a great move (black has a rook more, excellent!) but it misses 
        the fact, that black will loose his queen in the next move. <br/>
        This can be prevented by after calculating to the given depth continuing to calculate, but only possible takes in the given position. This will be continued to an additional 
        depth of four (probability should be calculating all possible takes) where only takes are considered. Rusty Rook 
        uses <a href="https://www.chessprogramming.org/Negamax" target="_blank">Negamax</a>, which is a extension to Minimax, where both 
        sides try to maximize the value (which will be inverted for the other side) and thus reducing duplicate code (Concept is still the same).

        While this works completely fine some improvements to this can be made to reduce the total amount of calculated positions.

        <h3 className="blog_heading" id="engine_alphabeta">
          Alpha-Beta Prunning
        </h3>

          The most common improvement is making usage of the fact, that both players will always play the best possible move (If not true for the opponent even better for us). 
          Thus some paths dont need to be calculated, as we can (without calculating them) eliminate that they will be played. 
          This concept is called <a target="_blank" href="https://www.chessprogramming.org/Alpha-Beta">Alpha-Beta Prunning</a>. If we go back to the previously used game tree, we 
          know after calculating the left side, that the result of this node is -1. The moment we get the evaluation of -2 for the first white position on the right side we 
          know (given the fact, that black will play the move with the lowest rating) that the result of the right node is at maximum -2 (it could be every number lower than -2).<br/>
          Due to the fact, that we know the left node has a rating of -1 and white will choose the highest number (-1 {">"} -2) the engine can stop calculating all other moves on the 
          right node, as they will never be played (no matter their evaluation)


        <figure className="blog_figure_center">
          <img
            className="blog_alphabeta blog_img"
            aria-label="Alpha Beta Prunning"
          />
        </figure>

        This method can reduce the amount of calculated positions by a lot, especially if there are lots of so called cutoffs. The likelihood of a cutoff happening can be improved, when first 
        calculating possible good moves. This is done in RustyRook by first evaluating all takes and then all other moves, as a take is more likely to be a good move compared to us
        playing a2a3. Other engines use even more complex move ordering where the order by the value of the captured piece and also play checks to the opponent king at the beginning.
        Move Ordering is a kinda funny dynamic in chess programming where slowing down the generation of the moves by ordering them may improve the overall speed as less moves are considered.
      

        <h3 className="blog_heading" id="engine_transpositional">
          Transpositional Table
        </h3>

        When calculating chess positions the engine will encounter the same position multiple times. This concept known as 'Zugumstellung' can be seen in the figure below, where it
        does not matter which knight was played first, as after black moves his second knight we end up in the same position. The engine needs to be able to recognize that it already 
        evaluated this position. This also applies to calculations made some moves ago, which may still be eligible.

        <figure className="blog_figure_center">
          <img
            className="blog_transposition blog_img"
            aria-label="Four Knights Game"
          />
        </figure>

        If we would save all previously calculated positions with their best move and evaluation in a large table we could use this as a lookup table and reuse these calculations. This 
        lookup table is called <a target="_blank" href="https://www.chessprogramming.org/Transposition_Table">Transpositional Table</a>. Each entry of the table contains the 
        following values:

        <pre className="blog_code_pre nocenter">
        <code className="blog_code">  
            depth: u8, <br/>
            evaluation: f32, <br/>
            best_move: PossibleMove, <br/>
            flag: Exact | Lowerbound | Upperbound
        </code> 
          </pre>

        The PossibleMove Object contains the best move for the given position. We need the depth as this is an indicator how much deeper into the future this evaluation is based on. 
        If we want to calculate to a depth of 10, but this evaluation is only based on a depth of 4 it is not suitable, as we need to look deeper into the future. The flag indicates if 
        this evaluation is exact (no Alpha-Beta Prunning used), it is a Beta cutoff (Lowerbound - or in other words best evaluation is this value or less) 
        or an Alpha cutoff (Upperbound - best evaluation is this value or greater). In case of the later two we need to check if the value 
        from the transpositional table would result in the same cutoff, as otherwise we might use an evaluation where not all positions are considered (and thus not play the best possible move).<br/>
        To prevent memory shifting at runtime RustyRook initializes its Transposition Table at a size of 3.200.000 possible entries. This table should be large enough to prevent 
        overwriting entries (using an even larger table would block more memory - this table is larger than 100MB already) <br/><br/>

        Now we only need a good index for each entry in our Transpositional Table. The initial thought of using 
        the <a target="_blank" href="https://www.chessprogramming.org/Forsyth-Edwards_Notation">FEN-String</a> of the chess position is not suitable, as generating the FEN-String 
        takes to much time. The much better concept is using a so-called <a target="_blank" href="https://www.chessprogramming.org/Zobrist_Hashing">Zobrist Hash</a>. Zobrist Hashing 
        works by creating a pseudo random (possibly duplicate, even tough really unlikely) number to represent the current chess position. At startup we generate

        <pre className="blog_code_pre nocenter">
        <code className="blog_code">  
            One u64 Number for each Piece at each Square (White and Black)<br/>
            One u64 Number to indicate the side to move<br/>
            Four u64 Numbers to represent the castle rights<br/>
            One u64 Number for each square in case of a possible en passant move <br/>
            One initial random number
        </code> 
        </pre>

        We use these numbers to generate the Zobrist Hash for the current board. The board starts with the initial random number and then just perform a Bitwise Exclusive OR Operation 
        for all pieces (of the initial position and whenever one is changed). 

        <pre className="blog_code_pre">
        <code className="blog_code">  
            3847293847293847239 ^ 9182739182739182731... <br/>
            Initial Random Number ^ Hash for White Rook on a1 ^ Hash for White Knight on b1 ... <br/><br/>

            3847293847293847239 == ((3847293847293847239 ^ 9182739182739182731) ^ 9182739182739182731)
        </code> 
        </pre>

        Using a Bitwise Exclusive OR Operation has the nice effect, that performing it twice results in the same value again (Which is important to produce the same hash after
        moving a figure a2a3 and then back a3a2). We then simply need to keep updating 
        the Zobrist Hash (which is a field within the chessboard Object) whenever a figure is moved, captured, promoted etc.. and end up with a unique 
        index for our Transposition Table. <br/>

        <h3 className="blog_heading" id="engine_iterative">
          Iterative Deepening
        </h3>

        Now the Engine only faces one issue: It should be able to play different types of modes (mainly Bullet, Blitz, Rapid). Within those different modes it should do something 
        its creater is not really good at - time management. Either play a move after only 1s or take 20s for each move. This is difficult to implement with the current structure, as 
        a depth of 6 might be feasible within one second in the endgame of a game, while it probably will take more than this time in the middle game, where there are lots of 
        possible moves. It is also not possible to just calculate to a fixed depth of lets say 6 and then just stop the calculation, as this would mean that some moves are evaluated 
        to the requested depth while others are completely ignored. <br/>
        This is why Rusty Rook uses a concept called <a target="_blank" href="https://www.chessprogramming.org/Iterative_Deepening" >Iterative Deepening</a>. Iterative Deepening works 
        by evaluating the position at a depth of 2. If it is finished doing that it starts a new evaluation with a depth of 3 doing this over and over again until a given time
        is reached, where the engine will stop and use the best move of the last full iteration. While this initially sounds like a crazy idea which should take much longer it is 
        in reality actually faster due to using the Transpositional Table and a better move ordering. <br/><br/>
        RustyRook does the actual evaluation in parallel using <a href="https://docs.rs/rayon/latest/rayon/" target="_blank">Rayon</a>. This comes with some issues, as doing parallel 
        evaluation makes it difficult to effectively implement Alpha-Beta Pruning, as sharing the values between all threads rayon creates would possibly create an overhead. Thus each 
        iteration starts with a calculation of the previous best move (taken from the Transpositional Table), which is calculated ahead of time to provide as baseline value for possible 
        Alpha-Beta Prunning. <br/>
        The Result of each iteration is sent to another Thread (Conductor Thread) using <a href="https://doc.rust-lang.org/book/ch16-02-message-passing.html" target="_blank">Channels</a>. This Thread 
        receives all results and returns the current best move when the given time is up. Using this Method RustyRook usually reaches a depth of 8 (middlegame) within the a Blitz game (5-7s) to
        think, which is a solid value (considering it is actually a depth of 12 with the four additional 'takes only'). But this is also one of the the primary focuses 
        for increasing the strengh of RustyRook, as it loses some games where the position is bad at a depth of 14-18 and other faster engines are able to see this far into 
        the future (obv. the best engines are much much faster).

        <figure className="blog_figure_center">
          <img
            className="blog_iterativedeepening blog_img"
            aria-label="Iterative Deepening Functionality"
          />
        </figure>

        RustyRook only cares about the calculations at even depth, as an odd depth means that it ends after its own move thus possibly thinking taking a protected figure is good.

        <h2 className="blog_heading" id="evaluation">
          Evaluation
        </h2>

        The last Part of RustyRook we need to take a look at is his evaluation. The Evaluation is the part where he rates the current position for both colors and thus a
        crucial part. <br/>
        As a basis of RustyRook´s evaluation the pieces relative values are used (Pawn = 1, Rook = 5, Queen = 9) with a little adjustment making the Bishop more
        valuable than the Knight (3.2 vs 3.0). The second part of the evaluation is an individual value for each piece for its current field to encourage the development of 
        pieces. The code block below displays these values for the knight (note, this is array thus the top left value is index 0 = a1, not a8)

        <pre className="blog_code_pre">
        <code className="blog_code blog_code_smaller">  
    1.8, 2.7, 2.0, 2.0, 2.0, 2.0, 2.7, 1.8, <br/>
    2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, <br/>
    2.0, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 2.0, <br/>
    2.0, 3.0, 3.2, 3.2, 3.2, 3.2, 3.0, 2.0, <br/>
    2.0, 3.0, 3.2, 3.2, 3.2, 3.2, 3.0, 2.0, <br/>
    2.0, 3.2, 3.2, 3.2, 3.2, 3.2, 3.2, 2.0, <br/>
    2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.0, <br/>
    1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 1.8  <br/>
        </code> 
        </pre>

        The King has multiple of those tables. In the earlygame he should hide in the corner to protect himself. As soon as there is less than 15 piece value on the board for 
        the opponent the king should be active and place himself at the center of the board. Additionally, as soon as the end game is reached the opponent king should be
        pushed to the border of the game to checkmate him. If you are interested in all the other positional values 
        check out <a href="https://github.com/chooklii/RustyRook/blob/main/src/evaluation/mod.rs" target="_blank">the tables within the source code</a>.
        As another method I added a little bonus of 0.02 (Rook and Bishop) and 0.005 (Queen) to all sliding pieces for each field the can move to with the intention to place 
        them actively on the board. Before running my first games online on lichess I also added a little tariff of 0.1 (initially it was 0.2, but I nerfed it after a few games)
        for each duplicate pawn. <br/><br/>

        <figure className="blog_figure_center">
          <img
            className="blog_castle blog_img"
            aria-label="Chess Position with King about to castle"
          />
        </figure>

        After playing some games online I was able to detect some issues with the evaluation of RustyRook. First and foremost the King did not check whether he was protected 
        by pawns. RustyRook was castling to the right side in games like the one displayed above - a move no human would do. 
        Pushing pawns on the side we castled on is generally not the best idea. Additionally no bonus was given for passed pawns. <br/>
        So I added a little bonus to push the pawns on the side we did not castle to (with an additional bonus if the opponent did castle do that side). 
        
        <figure className="blog_figure_center">
          <img
            className="blog_push_pawns blog_img"
            aria-label="Chess Position with Arrows where to push pawns"
          />
        </figure>

        Additionally passed pawns got a bonus dependent on the column they are on. (Passed pawns are detected by using Bitboards for each row to check 
        if there is a opponent pawn in front of the pawn (+ the row left and right of the pawn)). <br/>
        I also added a bonus for the king if he is surrounded by friendly pieces and a small bonus for the rooks if they are connected. 

        <figure className="blog_figure_center">
          <img
            className="blog_king_movement blog_img"
            aria-label="Won chess position for white"
          />
        </figure>


        The current version of RustyRook still has some issues with its king movement. The engine positions its king in the center of the board in the endgame and thus 
        fails to win winning endgames like the one displayed above, where the white king should not be in the center of the board, but rather helping push the pawns. This is
        something I need to work on in the future, as well as finetuning all the other values used. All these changes are rabbit holes but chess engine games often come 
        down to a pawn and king endgame (with maybe +1 pawn for one side) and due to this issue RustyRook is losing a lot of endgames he should be winning easily. 

        <h2 className="blog_heading" id="outlook">
          General Thoughts and Outlook
        </h2>

        After finishing the first version of RustyRook and letting it play some games on lichess I added a small Opening Book with some standard chess openings RustyRook 
        uses for his first few moves. This helps the engine in the opening and thus he has more time to think for his moves after the opening. Funnily enough this 
        decreased his rating on lichess as he now plays some openings where he is somewhat lost when he is 'out of his book', but I will still keep the book as one day he 
        will maybe better understand what he is playing (and if not he is at least not playing the same opening over and over again and thus more fun to play against). <br/>

        The last things (at least for now) I did was doing some profiling using <a target="_blank" href="https://crates.io/crates/flamegraph">Flamegraph</a> 
        {" "} and <a href="https://crates.io/crates/dhat" target="_blank">dhat</a> to detect possible glaring issues within my engine. The Heap analysis of dhat showed, that 
        a total of 64% (2.192.442 blocks, 360.486.336 bytes) of the total (3.402.172 blocks, 704.578.333 bytes) are used for the Vector the possible moves within the 
        engine are stored in. Thinking about this this should probably be no suprise as there are millions of positions searched. Using this data (and the small lifetime 
        of the possible moves) I changed this data structure to <a href="https://crates.io/crates/smallvec" target="_blank">SmallVecs</a> thus moving the Possible Moves from 
        the Heap to the Stack gaining some milliseconds on the way.  <br/><br/>

        This is also a perfect example for Chess Programming in general. It is super fun, but also always a rabbit hole searching for every possible improvement doing things 
        your Pull Requests would be declined for at work (rightfully so). No Vibe Code in the world can help when your chess engine is playing horrible moves because you 
        missed a little "-" in one position of the code. Its super hard to debug (no breakpoints can help) and the only way to fix a bug is to really 
        understand the algorithm. RustyRook was an excellent project to understand and learn Rust and lots of other things on the way. But due to the things stated it is 
        also super time consuming. <br/>
        At the moment I write this text RustyRook is rated 1800 on Bullet and Blitz, which is a solid rating I am happy with (only playing other Bots, if it would play 
        humans it would propably be rated higher). I would like to reach a Elo of 2200+, which should be possible when adding some better move ordering, refactoring 
        some slow code and trying out more features of chess programming like Killer Moves or Null Moves. But this is something I may implement in the winter, lets see
        what the time is GOing to bring. <br/><br/>

        And in case you are wondering - I haven't beaten RustyRook in the three games we played. 

        <h3 className="blog_heading" id="play">
          Play and Source Code
        </h3> 

        You can play RustRook on <a href="https://lichess.org/@/RustyRookChessBot/all" target="_blank">Lichess</a> or by using 
        the <a href="https://github.com/chooklii/RustyRook" target="_blank">Source Code</a> to build your own executable. Note that the engine is not running all the time 
        on lichess (as it is only running on my computer which I don´t want to keep running all the time). If you want to play against it let me know. <br/><br/>

      Thank you for reading this blog. Please share your thoughts, comments and ideas using the <Link to="/kontakt">contact options</Link> on this website. <br/><br/>
      </div>

      <Footer />
    </div>
  );
};

export default RustyRook;
