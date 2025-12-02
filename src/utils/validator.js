// Validator utilities for FSA
import { STATES, ACTIONS, TRANSITIONS } from '../core/orderStates.js';

export class FSAValidator {
    // Validate if state exists
    static isValidState(state) {
        return Object.values(STATES).includes(state);
    }

    // Validate if action exists
    static isValidAction(action) {
        return Object.values(ACTIONS).includes(action);
    }

    // Validate transition
    static isValidTransition(fromState, action) {
        if (!this.isValidState(fromState)) {
            return {
                valid: false,
                error: `Invalid state: ${fromState}`
            };
        }

        if (!this.isValidAction(action)) {
            return {
                valid: false,
                error: `Invalid action: ${action}`
            };
        }

        const transitions = TRANSITIONS[fromState];
        if (!transitions || !transitions[action]) {
            return {
                valid: false,
                error: `No transition defined from ${fromState} with action ${action}`
            };
        }

        return {
            valid: true,
            nextState: transitions[action]
        };
    }

    // Get all possible paths from a state
    static getPossiblePaths(fromState, maxDepth = 5) {
        const paths = [];

        const explore = (currentState, path, depth) => {
            if (depth >= maxDepth) return;

            const transitions = TRANSITIONS[currentState];
            if (!transitions || Object.keys(transitions).length === 0) {
                paths.push([...path]);
                return;
            }

            for (const [action, nextState] of Object.entries(transitions)) {
                explore(nextState, [...path, { action, state: nextState }], depth + 1);
            }
        };

        explore(fromState, [], 0);
        return paths;
    }

    // Check if FSA is deterministic
    static isDeterministic() {
        for (const [state, transitions] of Object.entries(TRANSITIONS)) {
            for (const [action, nextState] of Object.entries(transitions)) {
                // In deterministic FSA, each (state, action) pair has exactly one next state
                if (Array.isArray(nextState)) {
                    return {
                        deterministic: false,
                        reason: `State ${state} with action ${action} has multiple next states`
                    };
                }
            }
        }
        return { deterministic: true };
    }

    // Check if all states are reachable from initial state
    static checkReachability(initialState) {
        const reachable = new Set([initialState]);
        const queue = [initialState];

        while (queue.length > 0) {
            const current = queue.shift();
            const transitions = TRANSITIONS[current];

            if (transitions) {
                for (const nextState of Object.values(transitions)) {
                    if (!reachable.has(nextState)) {
                        reachable.add(nextState);
                        queue.push(nextState);
                    }
                }
            }
        }

        const allStates = Object.values(STATES);
        const unreachable = allStates.filter(state => !reachable.has(state));

        return {
            reachableStates: Array.from(reachable),
            unreachableStates: unreachable,
            allReachable: unreachable.length === 0
        };
    }

    // Generate DOT notation for visualization
    static generateDOT() {
        let dot = 'digraph FSA {\n';
        dot += '  rankdir=LR;\n';
        dot += '  node [shape=circle];\n\n';

        // Add transitions
        for (const [fromState, transitions] of Object.entries(TRANSITIONS)) {
            for (const [action, toState] of Object.entries(transitions)) {
                dot += `  ${fromState} -> ${toState} [label="${action}"];\n`;
            }
        }

        dot += '}';
        return dot;
    }
}
