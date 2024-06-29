import type { JsonForm } from "@/types/json"
import {
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react"
import { type Dispatch, Fragment, type SetStateAction } from "react"
import type { UseFormGetValues } from "react-hook-form"

type Props = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	setFilename: Dispatch<SetStateAction<string>>
	filename: string
	onSubmit: (data: JsonForm) => void
	onSubmitLegacy: (data: JsonForm) => void
	getValues: UseFormGetValues<JsonForm>
}

const ExportModal = ({
	open,
	setOpen,
	filename,
	setFilename,
	onSubmit,
	onSubmitLegacy,
	getValues,
}: Props) => {
	function closeModal() {
		setOpen(false)
	}

	return (
		<>
			<Transition appear show={open} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<DialogPanel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-zinc-800 rounded-2xl">
									<DialogTitle
										as="h3"
										className="text-lg font-medium leading-6 text-gray-200"
									>
										Download File
									</DialogTitle>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											<input
												type="text"
												name="filename"
												placeholder="Filename"
												className="w-full text-white rounded-md bg-zinc-600 placeholder:text-zinc-400"
												value={filename}
												onChange={(e) => setFilename(`${e.target.value}`)}
											/>
										</p>
									</div>

									<div className="flex items-center gap-2 mt-4">
										<button
											type="button"
											className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-zinc-950 hover:bg-zinc-900"
											onClick={() => {
												onSubmitLegacy(getValues())
												setOpen(false)
											}}
										>
											Download Old
										</button>

										<button
											type="button"
											className="inline-flex justify-center px-4 py-2 text-sm font-medium border border-transparent rounded-md bg-zinc-950 hover:bg-zinc-900"
											onClick={() => {
												onSubmit(getValues())
												setOpen(false)
											}}
										>
											Download
										</button>
									</div>
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ExportModal
