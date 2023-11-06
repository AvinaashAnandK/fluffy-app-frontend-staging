import { Cloud, 
        Code, 
        Puzzle, 
        SearchCode,
        Slack,
        ToyBrick
} from 'lucide-react';

const LandingFeatures = () => {
    return ( 
        <section className="text-white font-bold pb-36 text-center space-y-5 ">
      <div className="px-4 md:px-6 ">
        <div className="grid gap-6 items-center">
          <div className="flex flex-col justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Unlock AI's Potential with Ease
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto">
              From complex problem-solving to seamless integration - Fluffy's features are designed to streamline your AI journey.
              </p>
            </div>
            <div className="w-full max-w-full space-y-4 mx-auto">
              <div className="grid grid-cols-3 gap-8">
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <Puzzle className='h-8 w-8'/>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    Problem Solver
                  </h2>
                  <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                  Simplify your complex challenges by breaking them down into small, solvable tasks, making AI work for you.
                  </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <SearchCode className='h-8 w-8'/>
                </div>
                <h2 className="text-xl font-bold text-white">
                Model Finder
                </h2>
                <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                Stay ahead of the curve with Fluffy’s model discovery, connecting you to the latest and most efficient AI.
                </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <ToyBrick className='h-8 w-8'/>
                </div>
                <h2 className="text-xl font-bold text-white">
                Intuitive Model Pipelining
                </h2>
                <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                Like playing with Legos, Fluffy lets you build robust model pipelines effortlessly — piece by piece for a custom fit.
                </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <Slack className='h-8 w-8'/>
                </div>
                <h2 className="text-xl font-bold text-white">
                    Test with Teams
                </h2>
                <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                Instantly test drive AI models in Slack. Get immediate feedback from business / product stakeholders.
                </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <Cloud className='h-8 w-8'/>
                </div>
                <h2 className="text-xl font-bold text-white">
                Your Cloud, Your Control
                </h2>
                <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                Deploy AI models where you want. Self-host or use Fluffy’s endpoints — it's your call.
                </p>
                </div>
                <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <Code className='h-8 w-8'/>
                </div>
                <h2 className="text-xl font-bold text-white">
                  Be API Ready
                </h2>
                <p className="text-zinc-200 dark:text-zinc-100 font-normal">
                Fluffy turns your model pipelines into ready-to-use APIs, making integration with your systems seamless.
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}
 
export default LandingFeatures;