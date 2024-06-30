import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "私について",
};

export default function Page() {
  return (
    <div className="content">
      <div className="min-h-screen">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100 text-wrap">
          ぽまえだれだ
        </h1>
        <p>ねこかわいいです。今年で高校生になりました。</p>
        <h3>SNSリンク集</h3>
        <p>
          ここに書かれてないのは70%偽物です。たぶん。
          <br />
          ご用件があればDiscordに、送信できなかったらTwitterかメールまでお願いします。
        </p>
        <ul>
          <li>
            Discord: ねこかわいい{" "}
            <Link href="https://discord.com/users/586157827400400907">
              @nekok500
            </Link>
          </li>
          <li>
            GitHub: <Link href="https://github.com/nekok500">@nekok500</Link>
          </li>
          <li>
            Twitter(現X): ねこかわいい{" "}
            <Link href="https://twitter.com/nekok500">@nekok500</Link>
          </li>
          <li>
            YouTube: ねこかわいい{" "}
            <Link href="https://youtube.com/@nekok500">@nekok500</Link>
          </li>
          <li>
            Misskey(移行済、移行先は消えました): ねこかわいい{" "}
            <Link href="https://misskey.io/@nekok500_">@nekok500_</Link>
          </li>
          <li>
            Keybase: <Link href="http://keybase.io/nekok500">@nekok500</Link>
          </li>
          <li>
            Steam: ねこかわいい{" "}
            <Link href="https://steamcommunity.com/id/nekok500">@nekok500</Link>
          </li>
        </ul>
        <p>Redditやってないです。nekok500持ってたらください。</p>
        <p className="text-xs text-gray-400 dark:text-gray-600">
          ※SNSでの発言は個人の見解であり、所属組織を代表するものではありません。
        </p>

        <p>
          メール: <Link href="mailto:me@nekok500.com">me@nekok500.com</Link>
          <br />
          GPG: <Link href="/gpg.asc">83B1 BB24 572F F1D4</Link>
        </p>

        <h3>所属団体</h3>
        <ul>
          <li>
            <Link href="https://www.rspnet.jp">RSPインターネットグループ</Link>{" "}
            組織員 2021/10/3〜
          </li>
          <li>
            <Link href="https://krnk.org">KuronekoServer</Link> 管理者
            2022/3/21〜2024/06/30
          </li>
        </ul>
      </div>

      <div>
        <p>
          ホロ: 🌸(メンシ
          {Math.floor(
            (new Date().getTime() - new Date("2023-12-06").getTime()) /
              (30 * 24 * 60 * 60 * 1000)
          )}
          ヶ月)
        </p>
      </div>
    </div>
  );
}
