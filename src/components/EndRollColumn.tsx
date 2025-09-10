import React, { useState, useEffect } from 'react'
import './EndRollColumn.css'

interface EndRollColumnProps {
  onClose: () => void
  onContinue: () => void
  isPreview?: boolean
}

const COLUMN_TEXT = `空だ。

この白い球を手に取るたび、胸の奥が静かに澄んでいく。
いつだってこの軽さが、俺を落ち着かせてくれる。
サッカーも、バスケも、テニスも、中は同じように空洞だと知っている。
けれど、その「空」を、掌の温度ごと感じ取れるのは、卓球だけだと思っている。

たぶん、俺にはこれくらいの軽さがちょうどよかったのだ。
重たいものを、昔からうまく抱えられなかった。
誰かの真剣な眼差しも、胸を焦がす恋も、ぶつかり合う感情も、青春と呼ばれる季節の「正しさ」は、どれも苦く、肌に合わなかった。
大学に入ってからの前半、俺はずっと水面を撫でるように暮らしていた。
深く潜らず、誰にも縛られず、ただ、乾いた笑い声が往復するだけの、薄くて穏やかな日々。
その中にいる限り、世界はやさしかった。
けれど、春が過ぎ、夏が過ぎると、空気がゆっくりと変わり始めた。
恋をし、夢を語り、目の奥に火を灯して歩き出す者たち。
彼らは静かに「重さ」を引き受けはじめていた。
重さには、引力がある。
軽いままの俺は、少しずつ誰の軌道からも外れていった。
それが寂しいとは思わなかった。思わないようにしていたのかもしれない。
最後に残ったのは、似たような空気を持つ友人が二人。
ラリーをする。ただそれだけ。
勝ち負けに意味はなく、ミスをしても誰も責めなかった。
笑い声が宙を漂い、やがて風にさらわれていく。
ただただ楽しく、やさしく、そしてどこか物足りなかった。
それでも、あの時間は確かに俺を守ってくれていた。

社会に出ると、世界は思った以上に重かった。

信頼を得ること。責任を果たすこと。常に正しい判断を求められること。
目に見えないその重さが、静かに背中に積もっていく。

朝、靴紐を結ぶとき、胸の奥で鈍いものが転がる。
もはや睡眠では癒えない摩耗が、日々を少しずつ削っていく。
周囲の人間たちは、いつの間にか社会の重さに慣れていた。
俺だけがあの日々に取り残されたまま、身動きが取れなくなりそうになっていた。
そのとき、引き出しの奥に、あの球を見つけた。
ラケットも探したが、見当たらなかった。
たぶん、実家に置いてきたのだろう。
残されていたのは、この球ひとつ。
掌に収まる、たったこれだけの軽さ。
慣れ親しんだ白球は落ち着きと共に当時の気持ちを蘇らせてくれる。

怖かったのだ。重さを持つことが。
傷つくことも、誰かに本気で挑むことも怖かった。
あの頃、本当は勝ちたかった。
声に出せないまま、胸の奥で、ずっと叫んでいた。
誰よりも本気でぶつかって、認められたくて。
それでも失うのが怖くて、その気持ちごと薄い毛布の下に押し込んだ。
だから何も生まれなかった。
軽さの中に身を置いたまま、ただ時間だけが通り過ぎていった。

ふざけあったあの二人は、今、どこで、どんな重さを背負っているのだろう。
どんな足音で、それぞれの場所へと向かっているのだろう。

あの時間に甘え、動かなかったのは俺だけだ。
その痛みが、今になってようやく形になって見えてきた。
遅れても追いつくしかない。
「重い方」を選ぶことでしか戻れない場所がある。
未熟さを「身軽さ」と偽ってきた自分を終わらせるために。
そして、あの頃の時間が逃避ではなく、生きた証だったと胸を張るために、
俺は、かつての救いを自らの手で壊すと決めた。
誰かと、本気でぶつかること。
負けて、傷ついて、何かを失って、それでも立ち上がること。
それを繰り返して初めて、自分で自分を支えられる足を持てるのだと、今は思う。
そんなふうに思ったとき、静かに火が灯った気がした。
恐れていたはずのその重さを抱きしめてみたい。
だから再び心から願おう。

勝ちたい。

かつてはアウトになっていたあの白球が、
今なら、ちゃんと重力を受け止めて、コートの内側に落ちてくれる気がした。`

const EndRollColumn: React.FC<EndRollColumnProps> = ({ onClose, onContinue, isPreview = false }) => {
  const [showButtons, setShowButtons] = useState(false)
  
  // プレビュー版では冒頭部分のみ表示（約400文字）
  const previewText = COLUMN_TEXT.substring(0, 128) + '...'
  const displayText = isPreview ? previewText : COLUMN_TEXT
  
  useEffect(() => {
    if (isPreview) {
      // プレビュー版では3秒後にボタンを表示
      const timer = setTimeout(() => {
        setShowButtons(true)
      }, 3000)
      return () => clearTimeout(timer)
    } else {
      // フル版ではすぐにボタンを表示
      setShowButtons(true)
    }
  }, [isPreview])

  return (
    <div className="end-roll-overlay">
      <div className="end-roll-container">
        <div className="end-roll-content">
          <div className="column-text">
            {displayText.split('\n').map((line, index) => (
              <p key={index} className="column-paragraph" style={{ animationDelay: isPreview ? `${index * 0.5}s` : '0s' }}>
                {line}
              </p>
            ))}
          </div>
          
          {showButtons && (
            <div className="end-roll-buttons">
              {isPreview ? (
                <>
                  <button 
                    className="end-roll-btn continue-btn"
                    onClick={onContinue}
                  >
                    続きを読む
                  </button>
                  <button 
                    className="end-roll-btn close-btn"
                    onClick={onClose}
                  >
                    閉じる
                  </button>
                </>
              ) : (
                <button 
                  className="end-roll-btn close-btn"
                  onClick={onClose}
                >
                  閉じる
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EndRollColumn
