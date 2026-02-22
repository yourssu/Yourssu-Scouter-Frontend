import * as Popover from '@radix-ui/react-popover';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BoxButton, IcArrowsChevronDownLine, IcClockFilled } from '@yourssu/design-system-react';
import { differenceInMinutes } from 'date-fns';
import { useState } from 'react';

import { patchScheduleLocation } from '@/query/schedule/mutations/patchScheduleLocation';
import { scheduleOptions } from '@/query/schedule/options';
import { Schedule } from '@/query/schedule/schema';
import { formatTemplates } from '@/utils/date';

interface InterviewSidebarClassroomCardProps {
  schedules: Schedule[];
}

function formatDuration(startTime: string, endTime: string) {
  const diff = differenceInMinutes(endTime, startTime);
  if (diff >= 60) {
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return `${hours}시간${mins > 0 ? ` ${mins}분` : ''}`;
  }
  return `${diff}분`;
}

const LOCATIONS = ['동아리방', '강의실', '비대면', '기타'] as const;
type LocationType = (typeof LOCATIONS)[number];

interface ScheduleLocationState {
  detail: string;
  type: LocationType;
}

function LocationSelect({
  type,
  detail,
  onChangeType,
  onChangeDetail,
  renderSaveButton,
}: {
  detail: string;
  onChangeDetail: (detail: string) => void;
  onChangeType: (type: LocationType) => void;
  renderSaveButton: () => React.ReactNode;
  type: LocationType;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="flex w-full gap-2">
        <Popover.Root onOpenChange={setOpen} open={open}>
          <Popover.Trigger asChild>
            <button className="bg-bg-basicDefault border-line-basicMedium aria-expanded:border-line-brandSecondary focus-visible:border-line-brandSecondary flex h-12 w-full shrink-0 items-center justify-between gap-1 rounded-xl border px-4 transition-colors outline-none">
              <p className="typo-b1_sb_16 text-text-basicPrimary">{type}</p>
              <IcArrowsChevronDownLine className="text-icon-basicPrimary size-5" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="start"
              className="bg-bg-basicDefault border-line-basicMedium z-50 flex w-[var(--radix-popover-trigger-width)] flex-col overflow-hidden rounded-xl border p-1 shadow-md"
              sideOffset={4}
            >
              {LOCATIONS.map((loc) => (
                <button
                  className="hover:bg-bg-basicLight focus-visible:bg-bg-basicLight typo-b1_rg_16 flex h-10 w-full items-center justify-start rounded-lg px-3 text-left transition-colors outline-none"
                  key={loc}
                  onClick={() => {
                    onChangeType(loc);
                    setOpen(false);
                  }}
                >
                  <span className="text-text-basicPrimary">{loc}</span>
                </button>
              ))}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
        {type === '동아리방' && renderSaveButton()}
      </div>

      {type !== '동아리방' && (
        <div className="flex w-full gap-2">
          <div className="bg-bg-basicLight focus-within:border-line-brandPrimary flex h-12 w-full items-center overflow-hidden rounded-xl border border-transparent transition-colors">
            <input
              className="typo-b1_rg_16 text-text-basicPrimary placeholder:text-text-basicTertiary size-full bg-transparent px-4 outline-none"
              onChange={(e) => onChangeDetail(e.target.value)}
              placeholder={
                type === '강의실'
                  ? '장소를 상세히 입력해주세요. ex) 진리관 404호'
                  : type === '기타'
                    ? '장소를 상세히 입력해주세요.'
                    : '(선택) Google Meet 링크 등을 입력해주세요.'
              }
              value={detail}
            />
          </div>
          {renderSaveButton()}
        </div>
      )}
    </div>
  );
}

export const InterviewSidebarClassroomCard = ({
  schedules,
}: InterviewSidebarClassroomCardProps) => {
  const queryClient = useQueryClient();
  const [locations, setLocations] = useState<Record<number, ScheduleLocationState>>(() =>
    schedules.reduce(
      (acc, s) => ({
        ...acc,
        [s.id]: {
          type: s.locationType === '동방' ? '동아리방' : (s.locationType as LocationType),
          detail: s.locationDetail ?? '',
        },
      }),
      {},
    ),
  );

  const [editedSchedules, setEditedSchedules] = useState<Record<number, boolean>>({});

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (params: Parameters<typeof patchScheduleLocation>[0]) => {
      return patchScheduleLocation(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: scheduleOptions(null).queryKey });
    },
  });

  const handleSave = async (scheduleId: number) => {
    const locMap = {
      동아리방: '동방',
      강의실: '강의실',
      기타: '기타',
      비대면: '비대면',
    } as const;

    const loc = locations[scheduleId];
    await mutateAsync({
      scheduleId,
      locationType: locMap[loc.type as LocationType],
      locationDetail: loc.detail,
    });

    setEditedSchedules((prev) => ({ ...prev, [scheduleId]: false }));
  };

  if (!schedules.length) {
    return null;
  }

  const dateStr = formatTemplates['01/01(월)'](schedules[0].startTime);

  const getInitialState = (s: Schedule) => ({
    type: s.locationType === '동방' ? '동아리방' : (s.locationType as LocationType),
    detail: s.locationDetail ?? '',
  });

  const checkIsChanged = (s: Schedule) => {
    const current = locations[s.id];
    if (!current) {
      return false;
    }
    const initial = getInitialState(s);
    return current.type !== initial.type || current.detail !== initial.detail;
  };

  const checkIsValid = (s: Schedule) => {
    const current = locations[s.id];
    if (!current) {
      return false;
    }
    if (current.type === '강의실' || current.type === '기타') {
      return current.detail.trim().length > 0;
    }
    return true;
  };

  return (
    <div className="bg-bg-basicDefault border-line-basicMedium flex w-full flex-col gap-4 rounded-[14px] border p-4">
      <div className="flex w-full items-center justify-between">
        <p className="typo-b1_sb_16 text-text-basicSecondary truncate">{dateStr}</p>
      </div>

      <div className="flex w-full flex-col items-center gap-5">
        {schedules.map((schedule) => {
          const isChanged = checkIsChanged(schedule);
          const isValid = checkIsValid(schedule);
          const isEdited = editedSchedules[schedule.id];
          const isSaveDisabled = !isChanged || !isValid || isPending;

          return (
            <div className="flex w-full flex-col items-start gap-2" key={schedule.id}>
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-bg-basicLight flex h-8 shrink-0 items-center justify-center rounded-[40px] px-3">
                    <span className="typo-b3_rg_14 text-text-basicSecondary text-center">
                      {schedule.name}
                    </span>
                  </div>
                  <p className="typo-b3_sb_14 text-text-basicTertiary truncate">{schedule.part}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="typo-b2_rg_15 text-text-basicTertiary truncate">
                    {formatTemplates['23:59'](schedule.startTime)}~
                    {formatTemplates['23:59'](schedule.endTime)}
                  </p>
                  <div className="bg-line-basicMedium h-[14px] w-px shrink-0" />
                  <div className="flex shrink-0 items-center gap-1">
                    <IcClockFilled className="text-text-basicSecondary size-4" />
                    <p className="typo-b3_sb_14 text-text-basicSecondary">
                      {formatDuration(schedule.startTime, schedule.endTime)}
                    </p>
                  </div>
                </div>
              </div>
              <LocationSelect
                detail={locations[schedule.id]?.detail ?? ''}
                onChangeDetail={(detail) => {
                  setLocations((prev) => ({
                    ...prev,
                    [schedule.id]: { ...prev[schedule.id], detail },
                  }));
                  setEditedSchedules((prev) => ({ ...prev, [schedule.id]: true }));
                }}
                onChangeType={(type) => {
                  setLocations((prev) => ({
                    ...prev,
                    [schedule.id]: { ...prev[schedule.id], type, detail: '' },
                  }));
                  setEditedSchedules((prev) => ({ ...prev, [schedule.id]: true }));
                }}
                renderSaveButton={() =>
                  isEdited ? (
                    <BoxButton
                      className="shrink-0"
                      disabled={isSaveDisabled}
                      onClick={() => handleSave(schedule.id)}
                      size="medium"
                      variant="filledPrimary"
                    >
                      저장
                    </BoxButton>
                  ) : null
                }
                type={
                  locations[schedule.id]?.type ??
                  (schedule.locationType === '동방'
                    ? '동아리방'
                    : (schedule.locationType as LocationType))
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
