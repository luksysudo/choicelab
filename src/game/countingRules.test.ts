import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateMission1Challenge1,
  validateMission1Challenge2,
  validateMission2Challenge1,
  validateMission2Challenge2,
  validateMission3Challenge1,
  validateMission3Challenge2,
  validateMission4Challenge1,
  validateMission4Challenge2
} from './countingRules.ts';

test('Misi 1 Tantangan 1: Memilih 1 hidangan (Aturan Penjumlahan: 4+3+2=9)', () => {
  const resultCorrect = validateMission1Challenge1(9, 'penjumlahan');
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  const resultWrongRule = validateMission1Challenge1(9, 'perkalian');
  assert.equal(resultWrongRule.isCorrect, false);

  const resultWrongMultiply = validateMission1Challenge1(24, 'perkalian');
  assert.equal(resultWrongMultiply.isCorrect, false);
});

test('Misi 1 Tantangan 2: Membuat paket pesanan (Aturan Perkalian: 3x4x2=24)', () => {
  const resultCorrect = validateMission1Challenge2(24, 'perkalian');
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  const resultWrongAdd = validateMission1Challenge2(9, 'penjumlahan');
  assert.equal(resultWrongAdd.isCorrect, false);
});

test('Misi 2 Tantangan 1: Outfit standar (Aturan Perkalian: 4x3x2=24)', () => {
  const resultCorrect = validateMission2Challenge1(24, 'perkalian');
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);
});

test('Misi 2 Tantangan 2: Aturan khusus dengan batasan ((2+3+3+3)*2 = 22)', () => {
  const resultCorrect = validateMission2Challenge2(22, 'syarat_khusus');
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  // Naive 24 without constraint
  const resultNaive = validateMission2Challenge2(24, 'syarat_khusus');
  assert.equal(resultNaive.isCorrect, false);
});

test('Misi 3 Tantangan 1: Rencana Akhir Pekan Nadia ((3*2) + (2*3) = 12)', () => {
  const resultCorrect = validateMission3Challenge1(12, 'gabungan');
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  // Wrong multiplication 6*6=36
  const resultWrong = validateMission3Challenge1(36, 'gabungan');
  assert.equal(resultWrong.isCorrect, false);
});

test('Misi 3 Tantangan 2: Perubahan kondisi kota ((1+2) + (1+3) = 7)', () => {
  const resultCorrect = validateMission3Challenge2(7);
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  const resultWrong = validateMission3Challenge2(10);
  assert.equal(resultWrong.isCorrect, false);
});

test('Misi 4 Tantangan 1: Sistem Pemesanan FoodGo (5 + 6 + 3 = 14)', () => {
  const resultCorrect = validateMission4Challenge1(14, 5, 6, 3);
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  // Wrong total
  const resultWrong = validateMission4Challenge1(10, 0, 0, 0);
  assert.equal(resultWrong.isCorrect, false);
  assert.equal(resultWrong.formula, '');

  // Right total but wrong breakdown
  const resultWrongBreakdown = validateMission4Challenge1(14, 6, 6, 2);
  assert.equal(resultWrongBreakdown.isCorrect, false);
  assert.equal(resultWrongBreakdown.formula, '');
});

test('Misi 4 Tantangan 2: Perubahan Data Lab (6 + 4 + 3 = 13)', () => {
  const resultCorrect = validateMission4Challenge2(13);
  assert.equal(resultCorrect.isCorrect, true);
  assert.equal(resultCorrect.scoreGained, 100);

  const resultWrong = validateMission4Challenge2(11);
  assert.equal(resultWrong.isCorrect, false);
  assert.equal(resultWrong.formula, '');
});

test('Scaffolding Hint Policy: Formula is hidden on wrong answers across all missions', () => {
  assert.equal(validateMission1Challenge1(5, 'penjumlahan').formula, '');
  assert.equal(validateMission1Challenge2(9, 'penjumlahan').formula, '');
  assert.equal(validateMission2Challenge1(9, 'penjumlahan').formula, '');
  assert.equal(validateMission2Challenge2(24, 'syarat_khusus').formula, '');
  assert.equal(validateMission3Challenge1(36, 'gabungan').formula, '');
  assert.equal(validateMission3Challenge2(10).formula, '');
});

