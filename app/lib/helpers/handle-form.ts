type CallbackAction<T> = (data: T) => void;

export const handleForm = <T>(
	form: HTMLFormElement,
	callback: CallbackAction<T>,
) => {
	// listen to the submit event of the form
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		fetch(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: { accept: "application/json" },
		})
			.then((response) => response.json())
			.then((r) => {
				callback(r as T);
			});
	});
};
