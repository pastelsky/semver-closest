const findClosestSemverMatch = require('./index')

it('returns null if semver array is empty', () => {
  const res = findClosestSemverMatch('1.2.0', [])
  expect(res).toEqual(null)
})

it('matches exact versions', () => {
  const res = findClosestSemverMatch('1.2.0', ['1.1.9', '1.2.0', '1.2.1'])
  expect(res).toEqual('1.2.0')
})

it('finds closest version if no exact match found (patch)', () => {
  const res = findClosestSemverMatch('1.2.0', ['1.1.9', '1.2.1', '1.2.2'])
  expect(res).toEqual('1.1.9')
})

it('finds closest version if no exact match found (minor)', () => {
  const res = findClosestSemverMatch('1.2.0', ['1.1.9', '1.3.1', '1.2.2'])
  expect(res).toEqual('1.1.9')
})

it('finds closest version if no exact match found (major)', () => {
  const res = findClosestSemverMatch('1.2.0', ['2.1.9', '4.3.1', '5.2.2'])
  expect(res).toEqual('2.1.9')
})

it('finds closest version if no exact match found (pre-release given)', () => {
  const res = findClosestSemverMatch('1.2.0-beta.4', ['2.1.9', '4.3.1', '5.2.2'])
  expect(res).toEqual('2.1.9')
})

it('finds closest version if no exact match found (pre-release in array)', () => {
  const res = findClosestSemverMatch('1.2.0-beta.4', ['2.1.9-beta.2', '4.3.1-beta.5', '5.2.2-alpha.2'])
  expect(res).toEqual('2.1.9-beta.2')
})

it('finds closest version if no exact match found (pre-release given)', () => {
  const res = findClosestSemverMatch('^1.2.0', ['2.1.9', '4.3.1', '5.2.2'])
  expect(res).toEqual('2.1.9')
})