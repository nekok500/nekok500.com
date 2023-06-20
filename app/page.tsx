import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 m-1 border border-gray-200 rounded-lg flex-1 shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>
      <p className="font-normal text-gray-700">{children}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto py-6">
      <h1 className="text-xl font-bold text-gray-900">
        こんにちは、私は<span className="text-indigo-600">ねこかわいい</span>
        です！
      </h1>
      <h3 className="text-gray-500">
        <a href="https://kuroneko6423.com">KuronekoServer Admin</a>
      </h3>
      <p className="mt-6 leading-6">
        しがない男子学生です。
        いろんな言語や界隈に手を出しては引っ込めてる自由な人(猫)です。
        お手柔らかにお願いします。
        Twitterのいいね欄とか絶対に見ちゃだめですからね！！！！
      </p>

      <div className="my-3 flex mx-auto justify-center text-4xl">
        <a className="mx-1" href="https://github.com/nekok500">
          <FaGithub></FaGithub>
        </a>
        <a className="mx-1" href="https://twitter.com/nekok500">
          <FaTwitter></FaTwitter>
        </a>
        <FaDiscord></FaDiscord>
      </div>
      <p className="my-1 text-xs text-gray-300">
        ※SNSでの発言は個人的な見解であり、所属組織を代表するものではありません。
      </p>

      <div className="mt-6 flex flex-wrap">
        <Card title="Programming languages">Python, TypeScript, Golang</Card>
        <Card title="Infrastructure">Kubernetes (On-Premise)</Card>
        <Card title="Skill">
          Discord Bot (discord.py), Web Application (Next.js)
        </Card>
        <Card title="Game">
          Minecraft, Genshin Impact, Honkai: Star Rail,{" "}
          <a href="https://osu.ppy.sh/users/17872850">osu!</a>
        </Card>
      </div>
    </div>
  );
}
