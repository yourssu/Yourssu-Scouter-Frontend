export const InterviewSidebar = () => {
  return (
    <div className="bg-bg-basicLight flex h-full w-full flex-col gap-2.5 px-5 py-12">
      <div className="border-line-basicMedium bg-bg-basicDefault flex flex-col gap-3 rounded-[14px] border border-solid p-4">
        <div className="flex items-center gap-[7px]">
          <p className="typo-b1_sb_16 text-text-basicSecondary">면접 일정 저장</p>
        </div>
        <div className="box-border flex items-center gap-10 py-2.5">
          <p className="typo-b1_rg_16 text-text-basicTertiary overflow-hidden text-ellipsis whitespace-nowrap">
            Jpeg로 저장된 면접 일정을 다운로드 할 수 있어요!
          </p>
        </div>
        <button
          className="flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-[#6B5CFF] px-4 hover:bg-[#5A4BDE]"
          type="button"
        >
          <span className="typo-b3_sb_14 text-white">시간표 저장하기</span>
        </button>
      </div>
    </div>
  );
};
