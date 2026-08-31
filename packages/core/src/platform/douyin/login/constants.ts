export const DOUYIN_USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) ' +
  'Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0'

export const LOGIN_STATIC_HEADERS = {
  csrfToken: process.env.DOUYIN_PASSPORT_CSRF_TOKEN || '0954e05cf058737af0d403f8635c56ae',
  verifyPortrait:
    process.env.DOUYIN_PASSPORT_VERIFY_PORTRAIT || '347a0777-4f77-4763-8f59-66fbedb9d23e.login',
  sessionDtrait:
    process.env.DOUYIN_DTRAIT ||
    'd0_HgaG5cbCt2TvTQfFophli7cgBIjkPxaejLZkNCkTKAp0+1hbltGQXl1ce/npOEuqubhquvwZSoskcE0tVIRBp1AXLgOXDNsve3W1bF9bwrTKwRN9a47k09pG0EEkFUT269kw3xmP1CDWUcrryk/nKJnTDfpRa59PHoz9A48o5Dck8LLR5baA5S7CWrIJSKYqwe0zGQnoqwSf90R4KWZEVb94RhUYS7CZ5/hZNdqcHoXEBcHCPCFDfTFst9pb2mn214ukL5We2+nZxgeYSs4iF8uQEmTCboa8vaXMSgIq7bmpBxyl2x0TfpPD95hMclWaGhyE2ghsiqM30bzLTWZ4LA==_B/THvsJnA9W+dXsAo3RCMcpdsHOb9d1ibvual7anfaUBo4Qp/2+3PTVlshdUJae6bF7dsmsa/UFE2UFOZNU22gqPQvF50ODK6kzR+7H7KObU4EKbmKENfaoSlnfkIPNwKZSfiBIOrdQknDnDaNK+uXfUxSp4RlClTymrwNqG67bGwG9HyMdQadhMTaIb6pF0plTcUIRUicx95qBcRUXhtLXXppDNFbp9oLIX0CQb/7DgchWZlt4ty9QirC7HCwf/xRZHTkNW8nheAH6d0DFLj8DQec25CsSvvrUyrTO0tx1EdTrFWzYpu+i93/yFGO7qI/HaUQn+UeG19G9LwQWlfLo8divuJDxU9HKXQEkPtssqF4RZyMat1Vv9uc/5zaxH1FvWhCJffWG0nx39xt7m60ZdF97GDpqVXv0w9fQOPgW6bWQgVLS1iG5dX0oJ1LXct9v6EKkIUF06oGqrs6QFmA=='
} as const
