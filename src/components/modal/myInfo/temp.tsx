import { Input } from "@/components/ui/input";
import { User } from "lucide-react";
import { useProfile } from "@/store/authStore";
import { useEffect, useRef, useState } from "react";
import DefaultThumbnail from "@/components/common/DefaultThumbnail";
import { Button } from "@/components/ui/button";
import { useCloseModal } from "@/store/modalStore";
import usePatchUserInfo from "@/hooks/API/user/usePatchUserInfo";

export default function UpdateMyInfoModal() {
  const closeModal = useCloseModal();
  const profile = useProfile();
  const imageRef = useRef<HTMLInputElement>(null);

  const [nickname, setNickName] = useState(profile?.nickname);
  const [password, setPassword] = useState("");
  // 서버에 보낼 image파일
  const [thumbnailImageFile, SetThumbnailImageFile] = useState<File | null>(
    null,
  );
  // 미리보기용 임시 blob url
  const [preview, setPreview] = useState("");

  const { mutate: updateUserInfo } = usePatchUserInfo();

  // 이미지는 url string과 FileType으로 나뉘어짐
  // 이미지가 DB에 저장돼있으면 url string이고 없다면 빈 문자열임
  // 프론트에서 서버에 요청을 보내기 전까지는 FileType임
  // Todo: 이미지 파일을 어떤 순서로 처리할지 정해야함
  // 1. 프론트에서 storage에 저장하고 그 url을 서버로 보내는 방법
  // 2. 프론트에서 formdata를 서버에 보내고 서버에서 storage에 저장하고 프론트에 storage에 썸네일 url을 전달해주는 방법

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;
    SetThumbnailImageFile(file);
  };

  useEffect(() => {
    if (!thumbnailImageFile) return;

    const blobUrl = URL.createObjectURL(thumbnailImageFile);
    setPreview(blobUrl);
    return () => URL.revokeObjectURL(preview);
    // 사용자가 파일을 첨부할 때 마다 blob url을 해제시켜줘야하기 때문에 종속성 배열에 imageFile을 넣음
  }, [thumbnailImageFile]);

  const handleSubmit = () => {
    updateUserInfo({
      nickname,
      thumbnailImageFile: thumbnailImageFile,
      password,
    });
  };

  return (
    <div className="flex w-md flex-col rounded-sm bg-white p-6">
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
          <div className="text-sm leading-none font-medium">비밀번호</div>
          <Input
            value={password}
            disabled={profile?.authProvider === "KAKAO"}
            className={`mt-2 ${profile?.authProvider === "KAKAO" ? "bg-gray-50" : ""}`}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*******"
          />
          {profile?.authProvider === "KAKAO" && (
            <p className="mt-1 text-xs text-gray-500">
              SNS 로그인은 비밀번호를 변경할 수 없습니다.
            </p>
          )}
        </div>

        <div>
          <div className="text-sm leading-none font-medium">프로필 사진</div>

          <div
            className="mt-2 w-fit cursor-pointer rounded-xl border p-2"
            onClick={() => imageRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                className="size-28 rounded-full object-cover"
              />
            ) : profile?.thumbnail ? (
              <img
                src={profile.thumbnail}
                className="size-28 rounded-lg object-cover"
              />
            ) : (
              <DefaultThumbnail className="size-28" iconClassName="size-16" />
            )}
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

      <div className="flex justify-end gap-3">
        <Button onClick={closeModal} variant={"outline"}>
          취소
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600"
        >
          저장
        </Button>
      </div>
    </div>
  );
}
