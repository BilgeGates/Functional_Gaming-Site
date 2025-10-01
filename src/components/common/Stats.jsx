const Stats = ({ stats, variant = "default" }) => {
  if (variant === "header") {
    return (
      <div className="flex flex-wrap justify-center gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isClickable = stat.clickable;

          return (
            <div
              key={index}
              onClick={isClickable ? stat.onClick : undefined}
              className={`
                flex items-center gap-3 px-4 py-3
                rounded-xl shadow-md bg-gray-800/40 border border-gray-700/40
                transition-all duration-300
                ${
                  isClickable
                    ? "cursor-pointer hover:scale-105 hover:bg-gray-700/60"
                    : ""
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  flex items-center justify-center
                  w-10 h-10 rounded-lg
                  ${stat.bgColor || "bg-gray-700/60"}
                `}
              >
                <Icon className={`w-5 h-5 ${stat.color || "text-gray-400"}`} />
              </div>

              {/* Label */}
              <div>
                <p
                  className={`font-semibold text-sm ${
                    stat.color || "text-gray-300"
                  }`}
                >
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-gray-500">{stat.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isClickable = stat.clickable;

        return (
          <div
            key={index}
            onClick={isClickable ? stat.onClick : undefined}
            className={`
              relative group
              bg-gray-900/60 backdrop-blur-sm 
              border ${stat.borderColor || "border-gray-700/40"}
              rounded-xl sm:rounded-2xl
              p-3 sm:p-4 lg:p-5
              transition-all duration-300
              ${
                isClickable
                  ? `cursor-pointer ${stat.hoverBg || "hover:bg-gray-800/60"}
                     hover:border-opacity-60 hover:scale-105 hover:shadow-lg`
                  : ""
              }
            `}
          >
            {/* Background Gradient */}
            <div
              className={`
                absolute inset-0 rounded-xl sm:rounded-2xl
                ${stat.bgColor || "bg-gray-800/20"}
                opacity-50 group-hover:opacity-70 transition-opacity duration-300
              `}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-3 sm:gap-4">
              {/* Icon */}
              <div
                className={`
                  flex-shrink-0
                  w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14
                  rounded-xl sm:rounded-2xl
                  ${stat.bgColor || "bg-gray-800/40"}
                  flex items-center justify-center
                  group-hover:scale-110 transition-transform duration-300
                `}
              >
                <Icon
                  className={`
                    w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7
                    ${stat.color || "text-gray-400"}
                  `}
                />
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p
                  className={`
                    text-xs sm:text-sm lg:text-base
                    font-semibold
                    ${stat.color || "text-gray-400"}
                    truncate
                    group-hover:text-opacity-90 transition-colors duration-300
                  `}
                >
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {stat.description}
                  </p>
                )}
              </div>

              {/* Clickable Indicator */}
              {isClickable && (
                <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className={`w-4 h-4 ${stat.color || "text-gray-400"}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
