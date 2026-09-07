document.documentElement.classList.add('js');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const certificateGrid = document.querySelector('#certificate-grid');

if (certificateGrid) {
  const filter = document.querySelector('#certificate-filter');
  const sort = document.querySelector('#certificate-sort');
  const count = document.querySelector('#certificate-count');
  let certificates = [];

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[character]));

  const titleFor = (certificate) => {
    const category = certificate.category === 'Challenges & contests' ? 'Challenge / contest' : certificate.category;
    return `${category} certificate ${String(certificate.id).padStart(3, '0')}`;
  };

  const renderCertificates = () => {
    const selectedCategory = filter.value;
    const selectedSort = sort.value;
    const visible = certificates
      .filter((certificate) => selectedCategory === 'all' || certificate.category === selectedCategory)
      .sort((a, b) => {
        if (selectedSort === 'sequence-desc') return b.sequence - a.sequence;
        if (selectedSort === 'category') return a.category.localeCompare(b.category) || a.sequence - b.sequence;
        return a.sequence - b.sequence;
      });

    count.textContent = `${visible.length} of ${certificates.length} certificates`;
    certificateGrid.innerHTML = visible.length ? visible.map((certificate) => {
      const title = titleFor(certificate);
      const note = certificate.redacted ? 'Personal details redacted' : 'Open certificate';
      return `<article class="certificate-card"><a href="${escapeHtml(certificate.file)}" target="_blank" rel="noreferrer"><img loading="lazy" src="${escapeHtml(certificate.file)}" alt="${escapeHtml(title)}"></a><div class="certificate-card-meta"><p class="certificate-card-category">${escapeHtml(certificate.category)}</p><p class="certificate-card-title">${escapeHtml(title)}</p><p class="certificate-card-note">${escapeHtml(note)} <span aria-hidden="true">↗</span></p></div></article>`;
    }).join('') : '<p class="certificate-empty">No certificates match this filter.</p>';
  };

  fetch('assets/certificates.json')
    .then((response) => {
      if (!response.ok) throw new Error('Certificate archive unavailable');
      return response.json();
    })
    .then((data) => {
      certificates = data;
      [...new Set(certificates.map((certificate) => certificate.category))].forEach((category) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
      });
      renderCertificates();
    })
    .catch(() => {
      count.textContent = 'The archive could not be loaded';
      certificateGrid.innerHTML = '<p class="certificate-empty">The certificate archive is temporarily unavailable.</p>';
    });

  filter.addEventListener('change', renderCertificates);
  sort.addEventListener('change', renderCertificates);
}
