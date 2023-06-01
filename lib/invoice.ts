export function createInvoiceRequestObject(
  positions: { amount: string; text: string }[]
) {
  return {
    title: "",
    contact_id: 2, // Radicle Foundation
    contact_sub_id: null,
    user_id: 1, // Sebastian Martinez
    pr_project_id: null,
    language_id: 4, // English
    bank_account_id: 1, // Raiffeisen Account
    currency_id: 1, // CHF
    payment_type_id: 4, // Rechnung
    header: "",
    footer: "",
    mwst_type: 0,
    mwst_is_net: false,
    show_position_taxes: false,
    is_valid_from: "",
    is_valid_to: "",
    reference: "",
    api_reference: "",
    template_slug: "",
    positions: positions.map(({ amount, text }) => ({
      amount,
      unit_id: 2, // unit hours
      account_id: 150, // Dienstleistungserlös
      tax_id: 16, // 7.7%
      text,
      unit_price: "75",
      discount_in_percent: "0",
      type: "KbPositionCustom",
    })),
  };
}
