function YearDropdownCaption({ date, onYearChange }: any) {
  const currentYear = date.getFullYear();
  const yearRange = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i); // Adjust range as needed

  function handleYearChange(event: any) {
    const newYear = new Date(date);
    newYear.setFullYear(parseInt(event.target.value, 10));
    onYearChange(newYear);
  }

  return (
    <div className="flex justify-center items-center p-2">
      <select
        value={currentYear}
        onChange={handleYearChange}
        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
        {yearRange.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
export default YearDropdownCaption