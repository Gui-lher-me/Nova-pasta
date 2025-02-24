export function ChoiceList({ choices, selected, onChange, allowMultiple }) {
  const handleChange = (choiceValue) => {
    if (allowMultiple) {
      // For checkboxes, toggle the selection
      const newSelected = selected.includes(choiceValue)
        ? selected.filter((value) => value !== choiceValue) // Deselect
        : [...selected, choiceValue]; // Select
      onChange(newSelected);
    } else {
      // For radio buttons, set the selected value
      onChange([choiceValue]);
    }
  };

  return (
    <div className="max-h-[430px] divide-y divide-gray-200 overflow-y-auto scrollbar-thin dark:divide-neutral-700">
      {choices.map((choice) => (
        <div key={choice.value} className="flex px-3 py-2.5">
          <input
            type={allowMultiple ? "checkbox" : "radio"}
            className={
              allowMultiple
                ? "mt-0.5 shrink-0 rounded border-gray-300 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-900 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
                : "mt-0.5 shrink-0 rounded-full border-gray-200 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-primary-500 dark:checked:bg-primary-500 dark:focus:ring-offset-gray-800"
            }
            id={choice.value}
            checked={
              allowMultiple
                ? selected.includes(choice.value) // Checkbox: check if value is in selected array
                : selected?.[0] === choice.value // Radio: check if value matches the selected value
            }
            onChange={() => handleChange(choice.value)}
          />
          <label
            htmlFor={choice.value}
            className="ms-3 text-nowrap text-xs text-gray-800 dark:text-neutral-200"
          >
            {choice.label}
          </label>
        </div>
      ))}
    </div>
  );
}
