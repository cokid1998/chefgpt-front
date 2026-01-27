import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useProfile } from "@/store/authStore";
import { useRef, useState } from "react";
import DefaultThumbnail from "@/components/common/DefaultThumbnail";

export default function UpdateMyInfoModal() {
  const profile = useProfile();

  const [nickname, setNickName] = useState(profile?.nickname);
  const [imageFile, setImageFile] = useState();
  const imageRef = useRef<HTMLInputElement>(null);

  // 이미지는 url string과 FileType으로 나뉘어짐
  // 이미지가 DB에 저장돼있으면 url string이고 없다면 빈 문자열임
  // 프론트에서 서버에 요청을 보내기 전까지는 FileType임

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
  };

  return (
    <div className="flex w-xl flex-col rounded-sm bg-white p-6">
      <div className="mb-4 flex gap-2">
        <User className="text-green-500" />
        <span className="text-lg font-semibold">프로필 수정</span>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-sm leading-none font-medium">닉네임</div>
          <Input
            placeholder="닉네임을 입력하세요"
            className="mt-2"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
          />
        </div>

        <div>
          <div className="text-sm leading-none font-medium">이메일</div>
          <Input value={profile?.email} disabled className="mt-2 bg-gray-50" />
          <p className="mt-1 text-xs text-gray-500">
            이메일은 변경할 수 없습니다
          </p>
        </div>

        <div>
          <div className="text-sm leading-none font-medium">프로필 사진</div>

          <div
            className="mt-2 w-fit cursor-pointer rounded-xl border p-2"
            onClick={() => imageRef.current?.click()}
          >
            <DefaultThumbnail className="size-28" iconClassName="size-16" />
            <img src={imageFile} />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={imageRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
