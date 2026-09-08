document.querySelectorAll('.select-group').forEach(group => group.addEventListener('click', event => {
  const item = event.target.closest('button');
  if (!item) return;
  group.querySelectorAll('button').forEach(button => button.classList.remove('active'));
  item.classList.add('active');
}));

document.addEventListener('input', event => {
  const field = event.target;
  if (!field.matches('input, select') || !field.value) return;
  const draft = JSON.parse(localStorage.getItem('musaedDraft') || '{}');
  draft.liveFields ||= {};
  draft.liveFields[document.title] = field.value;
  draft.liveUpdatedAt = new Date().toLocaleTimeString('ar-OM');
  localStorage.setItem('musaedDraft', JSON.stringify(draft));
});

document.querySelector('form')?.addEventListener('submit', event => {
  event.preventDefault();
  const selected = [...document.querySelectorAll('.select-group .active')].map(item => item.textContent.trim());
  const fields = [...document.querySelectorAll('select, input')].map(item => item.value);
  const draft = JSON.parse(localStorage.getItem('musaedDraft') || '{}');
  draft.service = document.querySelector('.intro h2')?.textContent.trim() || '';
  draft.options = selected;
  draft.serviceFields = fields;
  localStorage.setItem('musaedDraft', JSON.stringify(draft));
  window.location.href = 'customer-details.html';
});
