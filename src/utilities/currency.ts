function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-AU',
      { maximumSignificantDigits: 4, style: 'currency', currency: 'AUD' }
    ).format(value);
}

export { formatCurrency }