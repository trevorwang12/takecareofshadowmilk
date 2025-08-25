import { cn } from "@/lib/utils";

export function HowToPlayGuide() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 rounded-lg shadow-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-orange-300 rounded-t-lg flex-shrink-0">
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 m-1 rounded-lg px-4 py-3">
          <h1 className="text-xl font-bold text-amber-800 text-center mb-1">
            Take Care of Shadow Milk
          </h1>
          <p className="text-sm text-orange-700 text-center">
            🎮 Fun Virtual Pet Care Guide 🍪
          </p>
          <p className="text-xs text-amber-700 text-center mt-1">
            Play, Feed, and Have Fun with Your Virtual Pet!
          </p>
        </div>
      </div>

      {/* Main content area with equal height steps */}
      <div className="flex-1 flex flex-col justify-between p-3 space-y-3">
        {/* Step 1: Feed */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-orange-300 rounded-lg flex-1">
          <div className="flex items-start gap-3 p-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-500 border-2 border-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">1</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-amber-800 mb-1">
                🍪 Feed Your Shadow Milk
              </h2>
              <p className="text-sm text-amber-700 mb-1">
                Give delicious cookies, milk, and treats to keep your pet happy!
              </p>
              <p className="text-xs text-orange-600 opacity-80">
                Try different foods to discover favorites!
              </p>
            </div>
            
            <div className="flex-shrink-0 flex gap-1">
              <div className="w-8 h-8 bg-amber-700 rounded-full flex items-center justify-center text-sm">🍪</div>
              <div className="w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center text-sm">🥛</div>
              <div className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-sm">🧁</div>
            </div>
          </div>
        </div>

        {/* Step 2: Play */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-amber-300 rounded-lg flex-1">
          <div className="flex items-start gap-3 p-4">
            <div className="flex-shrink-0 w-10 h-10 bg-amber-600 border-2 border-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">2</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-amber-800 mb-1">
                🎮 Play & Have Fun
              </h2>
              <p className="text-sm text-amber-700 mb-1">
                Engage in fun activities and playful interactions!
              </p>
              <p className="text-xs text-orange-600 opacity-80">
                The more you play, the stronger your bond becomes!
              </p>
            </div>
            
            <div className="flex-shrink-0 grid grid-cols-2 gap-1">
              <div className="w-7 h-7 bg-red-400 rounded-full flex items-center justify-center text-xs">🎾</div>
              <div className="w-7 h-7 bg-teal-400 rounded-full flex items-center justify-center text-xs">🧸</div>
              <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center text-xs">🎪</div>
              <div className="w-7 h-7 bg-purple-400 rounded-full flex items-center justify-center text-xs">🎨</div>
            </div>
          </div>
        </div>

        {/* Step 3: Care */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-lg flex-1">
          <div className="flex items-start gap-3 p-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-400 border-2 border-yellow-400 rounded-full flex items-center justify-center">
              <span className="text-lg font-bold text-white">3</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-bold text-amber-800 mb-1">
                💝 Love & Care
              </h2>
              <p className="text-sm text-amber-700 mb-1">
                Keep your pet clean, healthy, and loved every day!
              </p>
              <p className="text-xs text-orange-600 opacity-80">
                A happy pet is a healthy pet - show them you care!
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <div className="text-xs font-bold text-amber-800 mb-2">Status:</div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-amber-800 w-12">Happy</span>
                  <div className="w-12 h-1.5 bg-amber-700 rounded-full">
                    <div className="w-10 h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-amber-800 w-12">Energy</span>
                  <div className="w-12 h-1.5 bg-amber-700 rounded-full">
                    <div className="w-8 h-1.5 bg-yellow-500 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-amber-800 w-12">Health</span>
                  <div className="w-12 h-1.5 bg-amber-700 rounded-full">
                    <div className="w-11 h-1.5 bg-red-400 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-amber-800 w-12">Clean</span>
                  <div className="w-12 h-1.5 bg-amber-700 rounded-full">
                    <div className="w-9 h-1.5 bg-teal-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-400 border-2 border-orange-500 mx-3 mb-3 rounded-lg flex-shrink-0">
        <div className="px-4 py-2">
          <p className="text-sm font-bold text-amber-800 text-center">
            🌟 Have Fun and Enjoy Your Virtual Pet Adventure! 🌟
          </p>
        </div>
      </div>

      {/* Decorative elements - positioned more carefully */}
      <div className="absolute top-12 left-4">
        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-80 animate-pulse"></div>
      </div>
      <div className="absolute top-20 right-8">
        <div className="w-1 h-1 bg-orange-500 rounded-full opacity-70 animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      <div className="absolute bottom-20 left-3">
        <div className="w-1 h-1 bg-amber-600 rounded-full opacity-80 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>
      <div className="absolute bottom-12 right-4">
        <div className="w-1.5 h-1.5 bg-orange-300 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
      </div>

      {/* Star decorations */}
      <div className="absolute top-8 right-2">
        <div className="text-yellow-500 text-xs opacity-90">⭐</div>
      </div>
      <div className="absolute bottom-8 left-2">
        <div className="text-orange-500 text-xs opacity-80">⭐</div>
      </div>
    </div>
  );
}