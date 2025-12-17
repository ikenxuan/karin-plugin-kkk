interface Sponsor {
  name: string;
  amount: number;
  note?: string;
}

const sponsors: Sponsor[] = [
  { name: '止语语', amount: 25.0 },
  { name: '流月e', amount: 50.0 },
  { name: '流月e', amount: 50.0 },
  { name: '小什', amount: 50.0 },
  { name: '小什', amount: 3.0 },
  { name: '雾里', amount: 5.0 },
  { name: '止语语', amount: 25.6 },
  { name: '雾里', amount: 5.2 },
  { name: '雾里', amount: 5.2 },
  { name: '雾里', amount: 5.2 },
];

function mergeSponsors(list: Sponsor[]) {
  const map = new Map<string, { amount: number; notes: string[] }>();
  for (const s of list) {
    const existing = map.get(s.name) || { amount: 0, notes: [] };
    existing.amount += s.amount;
    if (s.note) existing.notes.push(s.note);
    map.set(s.name, existing);
  }
  return Array.from(map.entries())
    .map(([name, { amount, notes }]) => ({
      name,
      amount,
      note: notes.filter(Boolean).join('、'),
    }))
    .sort((a, b) => b.amount - a.amount);
}

export function SponsorList() {
  const merged = mergeSponsors(sponsors);

  return (
    <div className="my-4 overflow-hidden rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-fd-muted/50">
          <tr>
            <th className="px-4 py-2 text-left font-medium">老板</th>
            <th className="px-4 py-2 text-left font-medium">金额</th>
            <th className="px-4 py-2 text-left font-medium">备注</th>
          </tr>
        </thead>
        <tbody>
          {merged.map((sponsor, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2">{sponsor.name}</td>
              <td className="px-4 py-2">¥{sponsor.amount.toFixed(2)}</td>
              <td className="px-4 py-2 text-fd-muted-foreground">{sponsor.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
