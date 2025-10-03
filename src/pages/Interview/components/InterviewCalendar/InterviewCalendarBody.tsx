import { range } from 'es-toolkit';

export const InterviewCalendarBody = () => {
  const availableTimes = range(9 * 60, 22 * 60, 30).map((v) => ({
    hour: Math.floor(v / 60).toString(),
    minute: (v % 60).toString().padStart(2, '0'),
  }));

  return (
    <tbody>
      {availableTimes.map(({ hour, minute }, i) => {
        return (
          <tr key={`${hour}:${minute}`}>
            <td className="border-line-basicMedium h-14">
              <div className="typo-c2_sb_12 text-text-basicTertiary size-full px-2.5 py-[5px] text-right">
                {i % 2 === 0 && `${hour} : ${minute}`}
              </div>
            </td>
            {range(7).map((v) => (
              <td className="border-line-basicMedium h-14 border" key={`${hour}:${minute}:${v}`} />
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};
