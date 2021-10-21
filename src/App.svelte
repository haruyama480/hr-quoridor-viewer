<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";
  import YouTube from "svelte-youtube";
  import RecordBoard from "./sample/RecordBoard.svelte";
  const source_head = `
# コリドールの紹介
### はじめに
研究室時代に半年ぐらいハマっていたコリドールというボドゲを紹介します
##### 良さ
  - 10-20分で終わる手軽さ
  - シンプルなルール
  - 多用な戦略

### コリドールとは
`;

  const source_appendix1 = `
### 2次コンテンツ

##### youtube界隈
- 動画は少なめ
- 視聴者のコメントが厳しい！
  - 評価の割合
  - 辛辣なコメント集
    - https://www.youtube.com/watch?v=2kcrg5Xj1Rk
    - https://www.youtube.com/watch?v=9QfKR1arebQ
`;

  const source_appendix2 = `
##### コリドール研究所がすごい
https://www.youtube.com/channel/UCT0yvshNgB1Nx-xdB5fTVdg

ほんとんどコリドール研究所さんの動画で勉強しました

- 手得の概念
- 序盤の分類とそれぞれの傾向
- 終盤の詰め方
- そして、、

##### 国内最大級の大会
`;
  const source_appendix3 = `

今なら日本1になれるチャンス!
賞金も出ます!
  https://twitter.com/niko_it_sinx/status/1440987404110757888?s=20

##### リンク集
リンク
- 二人零和有限確定完全情報ゲーム wiki　https://ja.wikipedia.org/wiki/%E4%BA%8C%E4%BA%BA%E9%9B%B6%E5%92%8C%E6%9C%89%E9%99%90%E7%A2%BA%E5%AE%9A%E5%AE%8C%E5%85%A8%E6%83%85%E5%A0%B1%E3%82%B2%E3%83%BC%E3%83%A0
- コリドール wiki
  - https://ja.wikipedia.org/wiki/%E3%82%B3%E3%83%AA%E3%83%89%E3%83%BC%E3%83%AB
  - https://en.wikipedia.org/wiki/Quoridor
- コリドールfansite https://www.quoridorfansite.com/
- 日本コリドール協会 https://quoridor.jp/

論文
- 読んでない
- [簡略化した Quoridor の完全解析](https://www.info.kindai.ac.jp/~takasi-i/thesis/2019_16-1-037-0047_Y_Nishimura_thesis.pdf)
- [ゲームにおけるモンテカルロ着手選択の動的勝率調整](https://ipsj.ixsq.nii.ac.jp/ej/?action=repository_action_common_download&item_id=91433&item_no=1&attribute_id=1&file_no=1)
- [mastering quoridor](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.100.5204&rep=rep1&type=pdf)
- [A Quoridor-playing Agent](https://project.dke.maastrichtuniversity.nl/games/files/bsc/Mertens_BSc-paper.pdf)

その他
- コリドールAIという試み https://twitter.com/apmayfes/status/1128620591441797121?s=20

### おわりに
- 手筋の研究とか全然してない
- css辛い
`;
</script>

<SvelteMarkdown source={source_head} />

<h5>ゲーム性</h5>

<ul>
  <li>
    二人零和有限完全確定情報ゲーム
    <ul>
      <li>
        バックギャモンより難しく、チェスより簡単
        <a
          href="https://project.dke.maastrichtuniversity.nl/games/files/bsc/Mertens_BSc-paper.pdf"
          >link</a
        >
      </li>
      <div class="board-cont">
        <div class="board">
          <img
            src="/img/complexities.png"
            alt="complexities"
            style="width: 300px"
          />
        </div>
      </div>
    </ul>
  </li>
  <li>
    一応4人対戦可能だが、基本的に2人
    <ul>
      <li>ぷよぷよと同じ</li>
    </ul>
  </li>
</ul>

<h5>レギュレーション</h5>
<ul>
  <li>下辺からスタートし、上辺に先に到着したらゲーム終了</li>
  <li>1ターンにポーンを移動するか板を置くか</li>
  <li>板は相手のゴールを完全に塞ぐように置けない</li>
  <div class="board-cont">
    <div class="board">
      <RecordBoard
        grid_size={9}
        board_size="200px"
        history_="e2,e8,e3,e7,e4,e6,d3h,e6h,f4v,c5v,f3h,c6h,c3v,a6h"
      />
    </div>
  </div>

  <li>
    コマはある条件下で飛び越せる
    <ul>
      <li>目の前にポーンがあり、その裏に板がなければ飛び越えられる</li>
      <li>
        目の前にポーンがあり、その裏に板があり、かつポーンの横に板がなければ斜めに移動できる
      </li>
    </ul>
  </li>
</ul>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="200px"
      history_="e2,e8,e3,e7,e4,e6,e5,e4"
      step_={7}
    />
  </div>
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="200px"
      history_="e2,e8,e3,e7,e4,e6,e5,d4h,e4v,d5"
      step_={9}
    />
  </div>
</div>

<h5>対戦例</h5>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d3h,f6,f5h,e6,e3v,d6,e5,d5h,c4h,b5h,a4h,e6,h5h,d6,a6v,a8h,d8h,b8v,c6v,d6v,d5,d7,c5,d8,b5,c8,a5,c7,a6,b7,a7,b8,a8,a7,b8,a6,b7,a5,c7,b5,c8,c5,c9"
      step_={0}
      showClear={true}
      showHistory={true}
    />
  </div>
</div>

<h5>記法</h5>

<blockquote>
  <p>[a-i][1-9] | [a-h][1-8][v,h]</p>
</blockquote>

<ul>
  <li>アルファベットが左からの列、数字が下からの行数に対応</li>
  <li>
    末尾にv(vertical),h(horizontal)が付くと板の配置
    <ul>
      <li>b3vは、b3とc3のマスの上に配置する板</li>
      <li>b3hは、b3とb4のマスの上</li>
    </ul>
  </li>
  <li>つかなければ、ポーンの移動を示す</li>
  <li><a href="https://en.wikipedia.org/wiki/Quoridor#Notation">wiki</a></li>
</ul>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2"
      showClear={true}
      showHistory={true}
    />
  </div>
</div>

<h3>パターン</h3>

<h5>大回りさせる</h5>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d3h,e6h,e3v,c6h,e5v,a6h"
      step_={11}
      showClear={true}
      showHistory={true}
    />
  </div>
</div>

<h5>防御の板</h5>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d3h,e6h,e3v,c6h,e1v"
      step_={10}
      showClear={true}
      showHistory={true}
    />
  </div>
</div>

<h5>ルートの確定</h5>
終盤は防御の板をひたすら置いてルートを確定させます (内容あやしいかも)

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d3h,e6h,e3v,c6h,e1v,e5v,b3h,f2h,a2h,h2h,a4v,a7h,d5v,c4v,c7v,c2v,b8h,b1h,d4,e5,d5,e4,d6,d4,c6,d5,b6,b5h,a6,d6,a5,c6,a4,b6,a3,b7,b3,c7,c3,c8,c2,b8,b2,a8,a2,a9"
      showClear={true}
      showHistory={true}
    />
  </div>
</div>

<h5>シラー定石</h5>
<p>前もって背面を塞いでおくことで、大回りを防ぐ</p>
<p>
  別の言い方をすると、相手のルートを2つ保持したまま、自分のルートを1つに絞る
</p>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,d1v,e6,e4,e5,d4h,d5,d3v"
      step_={6}
    />
  </div>
  <p style="margin-top: 190px;">→</p>
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,d1v,e6,e4,e5,d4h,d5,d3v"
    />
  </div>
</div>

<h5>縦置き定石</h5>

<div class="board-cont">
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d5v,e5,e4h,e6h,g4h,g6h,h2h,f6v,g3v"
      step_={7}
    />
  </div>
  <p style="margin-top: 190px;">→</p>
  <div class="board">
    <RecordBoard
      grid_size={9}
      board_size="400px"
      history_="e2,e8,e3,e7,e4,e6,d5v,e5,e4h,e6h,g4h,g6h,h2h,f6v,g3v"
    />
  </div>
</div>

<SvelteMarkdown source={source_appendix1} />

<div style="margin-left:100px">
  <img src="/img/1.png" alt="1" style="width: 500px" />
  <img src="/img/2.png" alt="2" style="width: 500px" />
  <img src="/img/3.png" alt="3" style="width: 500px" />
  <img src="/img/4.png" alt="4" style="width: 500px" />
  <img src="/img/5.png" alt="5" style="width: 500px" />
</div>

<SvelteMarkdown source={source_appendix2} />

<YouTube videoId="_5zpI9fwnGY" />

<SvelteMarkdown source={source_appendix3} />

<style>
  .board-cont {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
  }
  .board {
  }
</style>
