"use client";
import Image from "next/image";
import { ReactNode, useState } from "react";
import { FaGithub, FaTwitter, FaDiscord, FaPython } from "react-icons/fa";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react";
import Link from "next/link";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-2 m-1 border border-gray-300 rounded-lg flex-1 shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-300">{children}</p>
    </div>
  );
}

function Collaborator({
  name,
  avatar,
}: {
  name: string;
  avatar: string;
}): ReactNode {
  const [isOpen, setIsPopover] = useState(false);

  return (
    <Popover isOpen={isOpen} placement="top" showArrow={true}>
      <PopoverTrigger
        onMouseEnter={() => setIsPopover(true)}
        onMouseLeave={() => setIsPopover(false)}
      >
        <Image
          className="rounded-full"
          src={`https://cdn.discordapp.com/avatars/${avatar}`}
          width={24}
          alt={""}
          height={24}
        />
      </PopoverTrigger>
      <PopoverContent>{name}</PopoverContent>
    </Popover>
  );
}

function ProjectCard({
  title,
  collab,
  children,
  link,
}: {
  title: React.ReactNode;
  collab?: React.ReactNode;
  children: React.ReactNode;
  link?: string;
}) {
  return (
    <Link href={link || "#"}>
      <div className="m-2 p-3 shadow my-2 border border-gray-300 rounded-lg">
        <h5 className="text-xl font-medium leading-tight text-gray-900 dark:text-gray-100 flex items-center">
          {title}
        </h5>
        <div className="mx-auto flex justify-end">
          <div className="flex items-center">
            {collab && (
              <>
                <span className="text-gray-600 dark:text-gray-400 mx-1">
                  with:
                </span>
                {collab}
              </>
            )}
          </div>
        </div>
        {children}

        {link && (
          <p className="mt-4 overflow-ellipsis overflow-hidden">{link}</p>
        )}
      </div>
    </Link>
  );
}

const links = [
  {
    platform: "github",
    name: "ねこかわいい",
    username: "nekok500",
    href: "https://github.com/nekok500",
    avatar: "https://avatars.githubusercontent.com/u/53959791",
    icon: <FaGithub />,
  },
  {
    name: "ねこかわいい",
    platform: "twitter",
    username: "nekok500",
    href: "https://twitter.com/nekok500",
    avatar:
      "https://cdn.discordapp.com/avatars/586157827400400907/f6f111c136d36b14bc7ca42738ce9ebb.webp",
    icon: <FaTwitter />,
  },
  {
    name: "ねこかわいい",
    platform: "discord",
    username: "nekok500",
    href: "https://discord.com/users/586157827400400907",
    avatar:
      "https://cdn.discordapp.com/avatars/586157827400400907/f6f111c136d36b14bc7ca42738ce9ebb.webp",
    icon: <FaDiscord />,
  },
];

export default function HomePage() {
  const [hoverItem, setHoverItem] = useState("");

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        こんにちは、私は
        <p className="text-indigo-600">ねこかわいい</p>
        です！
      </h1>
      <h3 className="text-gray-500">
        <a href="https://kuroneko6423.com">KuronekoServer Admin</a>
      </h3>
      <p className="mt-6 leading-6">
        しがない男子学生です。
        いろんな言語や界隈に手を出しては引っ込めてる自由な人(猫)です。
        お手柔らかにお願いします。
      </p>

      <ul className="my-3 flex mx-auto justify-center text-4xl">
        {links.map((link) => {
          return (
            <li key={link.platform}>
              <Popover
                placement="bottom"
                showArrow={true}
                isOpen={hoverItem === link.platform}
              >
                <PopoverTrigger
                  onMouseEnter={() => setHoverItem(link.platform)}
                  onMouseLeave={() => setHoverItem("")}
                >
                  <div className="mx-1">
                    <a href={link.href}>{link.icon}</a>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex px-1 py-2 items-center justify-between">
                    <Image
                      className="rounded-full"
                      src={link.avatar}
                      width={40}
                      height={40}
                      alt={""}
                    />
                    <div className="pl-2 flex flex-col items-center justify-between leading-4">
                      <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                        {link.name}
                      </span>
                      <span className="block text-center font-sm text-gray-600">
                        @{link.username}
                      </span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </li>
          );
        })}
      </ul>
      <p className="my-1 text-xs text-gray-400 dark:text-gray-600">
        ※SNSでの発言は個人の見解であり、所属組織を代表するものではありません。
      </p>

      <div className="mt-6 flex flex-wrap">
        <Card title="Programming languages">Python, TypeScript, Golang</Card>
        <Card title="Infrastructures">Kubernetes (On-Premise)</Card>
        <Card title="Skills">
          Discord Bot (discord.py), Web Application (Next.js)
        </Card>
        <Card title="Games">Minecraft, GTA5</Card>
      </div>

      <h2
        id="projects"
        className="mt-8 text-3xl font-bold text-gray-900 dark:text-gray-100"
      >
        プロジェクト
      </h2>
      <div className="flex flex-col border-t-2">
        <ProjectCard
          title={
            <>
              <FaPython />
              Kuroneko-TTSBot
            </>
          }
          collab={
            <>
              <Collaborator
                name="黒猫ちゃん"
                avatar="608788412367110149/356aa0c6ffb2658b84d98e436be2081a.webp"
              />
              <Collaborator
                name="ap12"
                avatar="616577611052613632/52ba62f47adee29ce1ad0ab2d618e262.webp"
              />
            </>
          }
          link="https://tts.kuroneko6423.com"
        >
          <p>
            Discordのテキストチャンネルを読み上げるボットです。基本的な機能は無料で使えて、様々な種類の合成エンジンに対応しています。
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            discord.py, MongoDB
          </p>
        </ProjectCard>
        <ProjectCard
          title={
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
                className="fill-current"
              >
                <path d="M400.1 194.8C389.2 197.6 380.2 199.1 371 202.4C363.7 204.3 356.3 206.3 347.8 208.5L347.2 208.6C343 209.8 342.6 209.9 338.7 205.4C334 200.1 330.6 196.7 324.1 193.5C304.4 183.9 285.4 186.7 267.7 198.2C246.5 211.9 235.6 232.2 235.9 257.4C236.2 282.4 253.3 302.9 277.1 306.3C299.1 309.1 316.9 301.7 330.9 285.8C333 283.2 334.9 280.5 337 277.5V277.5L337 277.5C337.8 276.5 338.5 275.4 339.3 274.2H279.2C272.7 274.2 271.1 270.2 273.3 264.9C277.3 255.2 284.8 239 289.2 230.9C290.1 229.1 292.3 225.1 296.1 225.1H397.2C401.7 211.7 409 198.2 418.8 185.4C441.5 155.5 468.1 139.9 506 133.4C537.8 127.8 567.7 130.9 594.9 149.3C619.5 166.1 634.7 188.9 638.8 218.8C644.1 260.9 631.9 295.1 602.1 324.4C582.4 345.3 557.2 358.4 528.2 364.3C522.6 365.3 517.1 365.8 511.7 366.3C508.8 366.5 506 366.8 503.2 367.1C474.9 366.5 449 358.4 427.2 339.7C411.9 326.4 401.3 310.1 396.1 291.2C392.4 298.5 388.1 305.6 382.1 312.3C360.5 341.9 331.2 360.3 294.2 365.2C263.6 369.3 235.3 363.4 210.3 344.7C187.3 327.2 174.2 304.2 170.8 275.5C166.7 241.5 176.7 210.1 197.2 184.2C219.4 155.2 248.7 136.8 284.5 130.3C313.8 124.1 341.8 128.4 367.1 145.6C383.6 156.5 395.4 171.4 403.2 189.5C405.1 192.3 403.8 193.9 400.1 194.8zM48.3 200.4C47.05 200.4 46.74 199.8 47.36 198.8L53.91 190.4C54.53 189.5 56.09 188.9 57.34 188.9H168.6C169.8 188.9 170.1 189.8 169.5 190.7L164.2 198.8C163.6 199.8 162 200.7 161.1 200.7L48.3 200.4zM1.246 229.1C0 229.1-.3116 228.4 .3116 227.5L6.855 219.1C7.479 218.2 9.037 217.5 10.28 217.5H152.4C153.6 217.5 154.2 218.5 153.9 219.4L151.4 226.9C151.1 228.1 149.9 228.8 148.6 228.8L1.246 229.1zM75.72 255.9C75.1 256.8 75.41 257.7 76.65 257.7L144.6 258C145.5 258 146.8 257.1 146.8 255.9L147.4 248.4C147.4 247.1 146.8 246.2 145.5 246.2H83.2C81.95 246.2 80.71 247.1 80.08 248.1L75.72 255.9zM577.2 237.9C577 235.3 576.9 233.1 576.5 230.9C570.9 200.1 542.5 182.6 512.9 189.5C483.9 196 465.2 214.4 458.4 243.7C452.8 268 464.6 292.6 487 302.6C504.2 310.1 521.3 309.2 537.8 300.7C562.4 287.1 575.8 268 577.4 241.2C577.3 240 577.3 238.9 577.2 237.9z" />
              </svg>
              <FaPython />
              Artifacter Modified
            </>
          }
          link="https://artifacter.kuroneko6423.com"
        >
          <p>
            原神のキャラクターステータスをグラフィカルに描画する、本家Artifacterの後継です。
            ステートレスなので高負荷にも耐えれる設計です。
          </p>
          <p className="text-gray-600 dark:text-gray-400">Gin, discord.go</p>
          <p className="text-gray-600 dark:text-gray-400">Pillow</p>
        </ProjectCard>
      </div>
    </div>
  );
}
