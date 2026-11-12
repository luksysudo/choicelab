import React, { useState } from 'react';
import { Sparkles, RotateCcw, CheckCircle2, Lock, Plus, ArrowRight, HelpCircle } from 'lucide-react';
import { playSound } from '../utils/audio.ts';

export interface TrayItem {
  id: string;
  name: string;
  icon: string;
  category: 'makanan' | 'minuman';
  packageType: 'hemat' | 'sehat' | 'spesial';
}

interface InteractiveTreeBuilderProps {
  packageType: 'hemat' | 'sehat' | 'spesial';
  onChangePackageType: (type: 'hemat' | 'sehat' | 'spesial') => void;
  onTreeUpdated?: (validPairsCount: number) => void;
}

interface TreeSlotStructure {
  id: string;
  expectedFoodId: string;
  placedFood: TrayItem | null;
  drinkSlots: {
    slotId: string;
    expectedDrinkId: string;
    placedDrink: TrayItem | null;
    isForbidden?: boolean;
    forbiddenNote?: string;
  }[];
}

export const InteractiveTreeBuilder: React.FC<InteractiveTreeBuilderProps> = ({
  packageType,
  onChangePackageType,
  onTreeUpdated
}) => {
  // Pool of cards for all package types
  const trayItemsPool: TrayItem[] = [
    // Paket Hemat items
    { id: 'h_rice', name: 'Rice Bowl Teriyaki', icon: '🍚', category: 'makanan', packageType: 'hemat' },
    { id: 'h_burger', name: 'Beef Burger', icon: '🍔', category: 'makanan', packageType: 'hemat' },
    { id: 'h_wrap', name: 'Chicken Wrap', icon: '🌯', category: 'makanan', packageType: 'hemat' },
    { id: 'h_tea', name: 'Green Tea', icon: '🍵', category: 'minuman', packageType: 'hemat' },
    { id: 'h_lemon', name: 'Lemon Fizz', icon: '🍋', category: 'minuman', packageType: 'hemat' },

    // Paket Sehat items
    { id: 's_salad', name: 'Salad Caesar', icon: '🥗', category: 'makanan', packageType: 'sehat' },
    { id: 's_salmon', name: 'Salmon Poke', icon: '🍣', category: 'makanan', packageType: 'sehat' },
    { id: 's_juice', name: 'Cold Press Juice', icon: '🧃', category: 'minuman', packageType: 'sehat' },
    { id: 's_coco', name: 'Coconut Water', icon: '🥥', category: 'minuman', packageType: 'sehat' },
    { id: 's_herb', name: 'Herbal Tea', icon: '🌿', category: 'minuman', packageType: 'sehat' },

    // Paket Spesial items
    { id: 'sp_wagyu', name: 'Wagyu Cut', icon: '🥩', category: 'makanan', packageType: 'spesial' },
    { id: 'sp_risotto', name: 'Truffle Risotto', icon: '🍲', category: 'makanan', packageType: 'spesial' },
    { id: 'sp_spark', name: 'Sparkling Grape', icon: '🍇', category: 'minuman', packageType: 'spesial' },
    { id: 'sp_coffee', name: 'Artisan Coffee', icon: '☕', category: 'minuman', packageType: 'spesial' }
  ];

  // Templates for each package type
  const getInitialTreeState = (type: 'hemat' | 'sehat' | 'spesial'): TreeSlotStructure[] => {
    if (type === 'hemat') {
      return [
        {
          id: 'branch_h1',
          expectedFoodId: 'h_rice',
          placedFood: null,
          drinkSlots: [
            { slotId: 'h1_d1', expectedDrinkId: 'h_tea', placedDrink: null },
            { slotId: 'h1_d2', expectedDrinkId: 'h_lemon', placedDrink: null }
          ]
        },
        {
          id: 'branch_h2',
          expectedFoodId: 'h_burger',
          placedFood: null,
          drinkSlots: [
            { slotId: 'h2_d1', expectedDrinkId: 'h_tea', placedDrink: null },
            { slotId: 'h2_d2', expectedDrinkId: 'h_lemon', placedDrink: null, isForbidden: true, forbiddenNote: 'Dilarang Sistem!' }
          ]
        },
        {
          id: 'branch_h3',
          expectedFoodId: 'h_wrap',
          placedFood: null,
          drinkSlots: [
            { slotId: 'h3_d1', expectedDrinkId: 'h_tea', placedDrink: null },
            { slotId: 'h3_d2', expectedDrinkId: 'h_lemon', placedDrink: null }
          ]
        }
      ];
    }

    if (type === 'sehat') {
      return [
        {
          id: 'branch_s1',
          expectedFoodId: 's_salad',
          placedFood: null,
          drinkSlots: [
            { slotId: 's1_d1', expectedDrinkId: 's_juice', placedDrink: null },
            { slotId: 's1_d2', expectedDrinkId: 's_coco', placedDrink: null },
            { slotId: 's1_d3', expectedDrinkId: 's_herb', placedDrink: null }
          ]
        },
        {
          id: 'branch_s2',
          expectedFoodId: 's_salmon',
          placedFood: null,
          drinkSlots: [
            { slotId: 's2_d1', expectedDrinkId: 's_juice', placedDrink: null },
            { slotId: 's2_d2', expectedDrinkId: 's_coco', placedDrink: null },
            { slotId: 's2_d3', expectedDrinkId: 's_herb', placedDrink: null }
          ]
        }
      ];
    }

    // Paket Spesial (Asymmetric: Wagyu has 2 drinks, Risotto has 1 drink + 1 locked)
    return [
      {
        id: 'branch_sp1',
        expectedFoodId: 'sp_wagyu',
        placedFood: null,
        drinkSlots: [
          { slotId: 'sp1_d1', expectedDrinkId: 'sp_spark', placedDrink: null },
          { slotId: 'sp1_d2', expectedDrinkId: 'sp_coffee', placedDrink: null }
        ]
      },
      {
        id: 'branch_sp2',
        expectedFoodId: 'sp_risotto',
        placedFood: null,
        drinkSlots: [
          { slotId: 'sp2_d1', expectedDrinkId: 'sp_spark', placedDrink: null },
          { slotId: 'sp2_d2', expectedDrinkId: 'sp_coffee', placedDrink: null, isForbidden: true, forbiddenNote: 'Kombinasi Terkunci' }
        ]
      }
    ];
  };

  const [treeSlots, setTreeSlots] = useState<TreeSlotStructure[]>(() => getInitialTreeState(packageType));
  const [selectedTrayItem, setSelectedTrayItem] = useState<TrayItem | null>(null);

  // Sync when package type changes
  const handleSwitchTab = (newType: 'hemat' | 'sehat' | 'spesial') => {
    playSound('select');
    onChangePackageType(newType);
    setTreeSlots(getInitialTreeState(newType));
    setSelectedTrayItem(null);
  };

  // Drag and drop state
  const handleDragStart = (e: React.DragEvent, item: TrayItem) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(item));
  };

  // Place food card into a food slot
  const handlePlaceFood = (branchId: string, item: TrayItem) => {
    if (item.category !== 'makanan') return;
    playSound('select');
    setTreeSlots((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, placedFood: item } : b))
    );
    setSelectedTrayItem(null);
  };

  // Place drink card into a drink slot
  const handlePlaceDrink = (branchId: string, slotId: string, item: TrayItem) => {
    if (item.category !== 'minuman') return;
    playSound('select');
    setTreeSlots((prev) =>
      prev.map((b) => {
        if (b.id !== branchId) return b;
        return {
          ...b,
          drinkSlots: b.drinkSlots.map((ds) =>
            ds.slotId === slotId ? { ...ds, placedDrink: item } : ds
          )
        };
      })
    );
    setSelectedTrayItem(null);
  };

  // Remove item from food slot
  const handleRemoveFood = (branchId: string) => {
    playSound('click');
    setTreeSlots((prev) =>
      prev.map((b) => (b.id === branchId ? { ...b, placedFood: null } : b))
    );
  };

  // Remove item from drink slot
  const handleRemoveDrink = (branchId: string, slotId: string) => {
    playSound('click');
    setTreeSlots((prev) =>
      prev.map((b) => {
        if (b.id !== branchId) return b;
        return {
          ...b,
          drinkSlots: b.drinkSlots.map((ds) =>
            ds.slotId === slotId ? { ...ds, placedDrink: null } : ds
          )
        };
      })
    );
  };

  // Reset current tree
  const handleReset = () => {
    playSound('click');
    setTreeSlots(getInitialTreeState(packageType));
    setSelectedTrayItem(null);
  };

  // Auto-fill template to help student inspect immediately
  const handleAutoFill = () => {
    playSound('unlock');
    const pool = trayItemsPool.filter((item) => item.packageType === packageType);
    setTreeSlots((prev) =>
      prev.map((b) => {
        const food = pool.find((item) => item.id === b.expectedFoodId) || null;
        return {
          ...b,
          placedFood: food,
          drinkSlots: b.drinkSlots.map((ds) => ({
            ...ds,
            placedDrink: pool.find((item) => item.id === ds.expectedDrinkId) || null
          }))
        };
      })
    );
  };

  // Calculate stats
  let totalSlotsCount = 0;
  let filledSlotsCount = 0;
  let validPairsCount = 0;
  let forbiddenPairsCount = 0;

  treeSlots.forEach((branch) => {
    totalSlotsCount += 1 + branch.drinkSlots.length;
    if (branch.placedFood) filledSlotsCount += 1;
    branch.drinkSlots.forEach((ds) => {
      if (ds.placedDrink) {
        filledSlotsCount += 1;
        if (branch.placedFood) {
          if (ds.isForbidden) {
            forbiddenPairsCount += 1;
          } else {
            validPairsCount += 1;
          }
        }
      }
    });
  });

  const availableItems = trayItemsPool.filter((item) => item.packageType === packageType);
  const isComplete = filledSlotsCount === totalSlotsCount;

  return (
    <div className="bg-slate-900/95 rounded-3xl p-5 border border-indigo-500/40 shadow-xl backdrop-blur-md">
      {/* Header with Title & Package Type Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h4 className="font-display font-bold text-sm text-cyan-300">
              Kerangka Diagram Pohon Interaktif FoodGo
            </h4>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Klik atau seret kartu dari rak bawah ke slot kosong untuk merakit cabang pohon kemungkinan
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => handleSwitchTab('hemat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              packageType === 'hemat'
                ? 'bg-cyan-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🍱 Hemat
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab('sehat')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              packageType === 'sehat'
                ? 'bg-emerald-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🥗 Sehat
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab('spesial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              packageType === 'spesial'
                ? 'bg-purple-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🥩 Spesial
          </button>
        </div>
      </div>

      {/* Interactive Tree Skeleton Canvas */}
      <div className="bg-slate-950/90 rounded-2xl p-4 border border-indigo-900/60 overflow-x-auto min-h-[300px]">
        <div className="min-w-[620px] flex items-center gap-5">
          {/* Root Node: FoodGo Category */}
          <div className="shrink-0 flex flex-col items-center">
            <div className="px-4 py-3 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-700 text-white font-display font-bold text-xs text-center shadow-lg border border-cyan-400/50">
              <span className="text-xl block mb-0.5">
                {packageType === 'hemat' ? '🍱' : packageType === 'sehat' ? '🥗' : '🥩'}
              </span>
              <span>
                {packageType === 'hemat'
                  ? 'Paket Hemat'
                  : packageType === 'sehat'
                  ? 'Paket Sehat'
                  : 'Paket Spesial'}
              </span>
              <span className="text-[10px] text-cyan-200 block font-mono font-normal">
                {packageType === 'hemat'
                  ? '3 × 2 (-1 Terlarang)'
                  : packageType === 'sehat'
                  ? '2 × 3 (Bebas)'
                  : '2 + 1 Pasangan'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 mt-1">Akar Sistem</span>
          </div>

          {/* Level 1 (Food Branches) & Level 2 (Drink Leaves) */}
          <div className="flex-1 space-y-4">
            {treeSlots.map((branch, branchIndex) => {
              const isFoodFilled = !!branch.placedFood;

              return (
                <div key={branch.id} className="relative flex items-center">
                  {/* Glowing branch line from root */}
                  <div
                    className={`w-6 h-[2px] transition-all duration-300 mr-2 shrink-0 ${
                      isFoodFilled ? 'bg-gradient-to-r from-cyan-400 to-indigo-400 shadow-[0_0_8px_#22d3ee]' : 'bg-slate-800'
                    }`}
                  />

                  {/* Level 1: Food Slot */}
                  <div className="shrink-0 w-44">
                    {branch.placedFood ? (
                      <div className="relative group bg-slate-800/90 border border-cyan-400/80 rounded-xl p-2.5 shadow-md flex items-center justify-between text-xs text-white">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{branch.placedFood.icon}</span>
                          <div>
                            <span className="text-[9px] text-cyan-300 block font-semibold">Makanan {branchIndex + 1}</span>
                            <span className="font-bold leading-tight block">{branch.placedFood.name}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFood(branch.id)}
                          className="w-5 h-5 rounded-full bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center text-[10px] transition-colors cursor-pointer"
                          title="Hapus Makanan"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          if (selectedTrayItem && selectedTrayItem.category === 'makanan') {
                            handlePlaceFood(branch.id, selectedTrayItem);
                          }
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const data = e.dataTransfer.getData('text/plain');
                          if (data) {
                            try {
                              const item: TrayItem = JSON.parse(data);
                              handlePlaceFood(branch.id, item);
                            } catch {
                              // ignore
                            }
                          }
                        }}
                        className={`w-full p-2.5 rounded-xl border-2 border-dashed text-left text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          selectedTrayItem?.category === 'makanan'
                            ? 'border-cyan-400 bg-cyan-950/60 text-cyan-200 animate-pulse ring-2 ring-cyan-400/40'
                            : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-cyan-500/60 hover:text-slate-200'
                        }`}
                      >
                        <Plus className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-[11px] font-medium leading-tight">
                          {selectedTrayItem?.category === 'makanan'
                            ? 'Klik Pasang Makanan'
                            : `[Slot Makanan ${branchIndex + 1}]`}
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Level 2: Sub-branch Drinks */}
                  <div className="ml-4 pl-3 border-l-2 border-indigo-900/80 space-y-2 flex-1">
                    {branch.drinkSlots.map((ds) => {
                      const isDrinkFilled = !!ds.placedDrink;
                      const isCompletePair = isFoodFilled && isDrinkFilled;

                      return (
                        <div key={ds.slotId} className="flex items-center gap-2">
                          {/* Mini branch line */}
                          <div
                            className={`w-4 h-[2px] transition-all duration-300 shrink-0 ${
                              isCompletePair ? 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]' : 'bg-slate-800'
                            }`}
                          />

                          {/* Drink Card or Dotted Slot */}
                          {ds.placedDrink ? (
                            <div
                              className={`p-2 rounded-xl border text-xs flex items-center justify-between gap-3 min-w-[210px] transition-all ${
                                ds.isForbidden
                                  ? 'bg-rose-950/70 border-rose-500/80 text-rose-200'
                                  : 'bg-slate-800/90 border-emerald-400/70 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base">{ds.placedDrink.icon}</span>
                                <div>
                                  <span className="font-bold block text-[11px] leading-tight">
                                    {ds.placedDrink.name}
                                  </span>
                                  {ds.isForbidden ? (
                                    <span className="text-[9px] text-rose-400 font-bold flex items-center gap-1">
                                      <Lock className="w-2.5 h-2.5" />
                                      {ds.forbiddenNote || 'Dilarang Sistem FoodGo'}
                                    </span>
                                  ) : (
                                    <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-2.5 h-2.5" />
                                      Pasangan Sah (+1)
                                    </span>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveDrink(branch.id, ds.slotId)}
                                className="w-4 h-4 rounded-full bg-slate-700 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center text-[9px] transition-colors cursor-pointer"
                                title="Hapus Minuman"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                if (selectedTrayItem && selectedTrayItem.category === 'minuman') {
                                  handlePlaceDrink(branch.id, ds.slotId, selectedTrayItem);
                                }
                              }}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                const data = e.dataTransfer.getData('text/plain');
                                if (data) {
                                  try {
                                    const item: TrayItem = JSON.parse(data);
                                    handlePlaceDrink(branch.id, ds.slotId, item);
                                  } catch {
                                    // ignore
                                  }
                                }
                              }}
                              className={`p-2 rounded-xl border-2 border-dashed text-left text-xs flex items-center gap-2 min-w-[200px] transition-all cursor-pointer ${
                                selectedTrayItem?.category === 'minuman'
                                  ? 'border-indigo-400 bg-indigo-950/60 text-indigo-200 animate-pulse ring-2 ring-indigo-400/40'
                                  : ds.isForbidden
                                  ? 'border-rose-900/60 bg-rose-950/20 text-rose-400 hover:border-rose-700'
                                  : 'border-slate-800 bg-slate-900/50 text-slate-500 hover:border-indigo-500/60 hover:text-slate-300'
                              }`}
                            >
                              <Plus className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                              <span className="text-[10px]">
                                {selectedTrayItem?.category === 'minuman'
                                  ? 'Klik Pasang Minuman'
                                  : ds.isForbidden
                                  ? '[Slot Minuman (Batasan)]'
                                  : '[Slot Minuman Segar]'}
                              </span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-Time Mathematical Counter Strip */}
      <div className="mt-3.5 p-3 rounded-2xl bg-indigo-950/60 border border-indigo-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-[10px] text-slate-400 block">Slot Terpasang</span>
            <span className="font-mono font-bold text-cyan-300">
              {filledSlotsCount} / {totalSlotsCount}
            </span>
          </div>
          <div className="border-l border-slate-700 pl-3">
            <span className="text-[10px] text-emerald-400 block font-semibold">✓ Pasangan Sah</span>
            <span className="font-mono font-bold text-emerald-300">{validPairsCount} Pasangan</span>
          </div>
          {forbiddenPairsCount > 0 && (
            <div className="border-l border-slate-700 pl-3">
              <span className="text-[10px] text-rose-400 block font-semibold">✗ Tereliminasi</span>
              <span className="font-mono font-bold text-rose-300">-{forbiddenPairsCount} Pasangan</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Rak</span>
          </button>
          <button
            type="button"
            onClick={handleAutoFill}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pasang Otomatis</span>
          </button>
        </div>
      </div>

      {/* Tray / Rak Kartu Makanan & Minuman di Bagian Bawah */}
      <div className="mt-4 pt-3.5 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <span>📦</span>
            <span>Rak Kartu Pilihan ({packageType === 'hemat' ? 'Paket Hemat' : packageType === 'sehat' ? 'Paket Sehat' : 'Paket Spesial'}):</span>
          </div>
          <span className="text-[10px] text-slate-400">
            {selectedTrayItem ? `Terpilih: ${selectedTrayItem.name} (klik slot di atas)` : 'Klik atau seret kartu ke slot cabang'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {availableItems.map((item) => {
            const isSelected = selectedTrayItem?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={() => {
                  playSound('select');
                  setSelectedTrayItem(isSelected ? null : item);
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-grab active:cursor-grabbing select-none ${
                  isSelected
                    ? 'bg-cyan-500/30 border-cyan-400 text-white ring-2 ring-cyan-400 shadow-lg scale-102'
                    : item.category === 'makanan'
                    ? 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-cyan-400/60 hover:bg-slate-800'
                    : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-indigo-400/60 hover:bg-slate-800'
                }`}
              >
                <span className="text-xl block mb-0.5">{item.icon}</span>
                <span className="text-xs font-bold block leading-tight">{item.name}</span>
                <span
                  className={`text-[9px] mt-1 inline-block px-1.5 py-0.2 rounded font-mono ${
                    item.category === 'makanan'
                      ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                      : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                  }`}
                >
                  {item.category === 'makanan' ? 'Makanan' : 'Minuman'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
