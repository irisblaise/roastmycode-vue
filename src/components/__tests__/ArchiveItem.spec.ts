import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ArchiveItem from '../ArchiveItem.vue'
import ShameScore from '../ShameScore.vue'
import type { ArchivedRoast } from '@/types/archive'
import { archiveService } from '@/services/archiveService'

vi.mock('@/services/archiveService', () => ({
  archiveService: {
    deleteRoast: vi.fn(),
  },
}))

describe('ArchiveItem', () => {
  const mockItem: ArchivedRoast = {
    id: 'test-id-123',
    code: 'const x = 1;',
    roast: 'This code is too simple!',
    score: 7,
    explanation: 'You should add more complexity.',
    timestamp: '2024-02-14T10:30:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the roast text correctly', () => {
    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    expect(wrapper.text()).toContain('This code is too simple!')
  })

  it('renders the ShameScore component when score is provided', () => {
    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    const shameScore = wrapper.findComponent(ShameScore)
    expect(shameScore.exists()).toBe(true)
    expect(shameScore.props('score')).toBe(7)
  })

  it('formats the date correctly', () => {
    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    expect(wrapper.text()).toMatch(/February 14, 2024/)
  })

  it('shows explanation when provided', () => {
    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    expect(wrapper.text()).toContain('Explanation:')
    expect(wrapper.text()).toContain('You should add more complexity.')
  })

  it('does not show explanation section when explanation is not provided', () => {
    const itemWithoutExplanation = { ...mockItem, explanation: undefined }
    const wrapper = mount(ArchiveItem, {
      props: { item: itemWithoutExplanation },
    })

    expect(wrapper.text()).not.toContain('Explanation:')
  })

  it('toggles code visibility when button is clicked', async () => {
    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    expect(wrapper.text()).toContain('Show Original Code')
    expect(wrapper.text()).not.toContain('const x = 1;')

    const toggleButton = wrapper.find('button[class*="text-sm"]')
    await toggleButton.trigger('click')

    expect(wrapper.text()).toContain('Hide Original Code')
    expect(wrapper.text()).toContain('const x = 1;')

    await toggleButton.trigger('click')
    expect(wrapper.text()).toContain('Show Original Code')
  })

  it('calls archiveService.deleteRoast and emits deleted event when delete is confirmed', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true)

    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    const deleteButton = wrapper.find('button[title="Delete roast"]')
    await deleteButton.trigger('click')

    expect(confirmSpy).toHaveBeenCalledWith('Are you sure you want to delete this roast?')
    expect(archiveService.deleteRoast).toHaveBeenCalledWith('test-id-123')
    expect(wrapper.emitted('deleted')).toBeTruthy()
    expect(wrapper.emitted('deleted')).toHaveLength(1)

    confirmSpy.mockRestore()
  })

  it('does not delete when user cancels confirmation', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false)

    const wrapper = mount(ArchiveItem, {
      props: { item: mockItem },
    })

    const deleteButton = wrapper.find('button[title="Delete roast"]')
    await deleteButton.trigger('click')

    expect(confirmSpy).toHaveBeenCalled()
    expect(archiveService.deleteRoast).not.toHaveBeenCalled()
    expect(wrapper.emitted('deleted')).toBeFalsy()

    confirmSpy.mockRestore()
  })
})
