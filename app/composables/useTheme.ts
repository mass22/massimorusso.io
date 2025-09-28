export const useTheme = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    colorMode.preference = theme
  }

  const getThemeIcon = () => {
    switch (colorMode.value) {
      case 'dark':
        return 'i-heroicons-moon'
      case 'light':
        return 'i-heroicons-sun'
      default:
        return 'i-heroicons-computer-desktop'
    }
  }

  return {
    colorMode: readonly(colorMode),
    isDark,
    toggleTheme,
    setTheme,
    getThemeIcon
  }
}
