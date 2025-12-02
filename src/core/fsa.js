// FSA Engine - Core Implementation
import { STATES, ACTIONS, TRANSITIONS, INITIAL_STATE, FINAL_STATES } from './orderStates.js';

export class FSAEngine {
    constructor() {
        this.currentState = INITIAL_STATE;
        this.history = [];
        this.transitionCount = 0;
    }

    // Get current state
    getCurrentState() {
        return this.currentState;
    }

    // Check if current state is final state
    isFinalState() {
        return FINAL_STATES.includes(this.currentState);
    }

    // Get available actions for current state
    getAvailableActions() {
        return Object.keys(TRANSITIONS[this.currentState] || {});
    }

    // Validate if action is valid for current state
    isValidAction(action) {
        return this.getAvailableActions().includes(action);
    }

    // Execute transition δ(currentState, action) -> nextState
    transition(action) {
        // Validate action
        if (!this.isValidAction(action)) {
            throw new Error(
                `Invalid transition: Cannot perform '${action}' from state '${this.currentState}'`
            );
        }

        const previousState = this.currentState;
        const nextState = TRANSITIONS[this.currentState][action];

        // Update state
        this.currentState = nextState;
        this.transitionCount++;

        // Record history
        const historyEntry = {
            id: this.transitionCount,
            from: previousState,
            action: action,
            to: nextState,
            timestamp: new Date().toISOString()
        };
        this.history.push(historyEntry);

        return {
            success: true,
            previousState,
            action,
            nextState,
            isFinal: this.isFinalState(),
            historyEntry
        };
    }

    // Get transition history
    getHistory() {
        return [...this.history];
    }

    // Get last transition
    getLastTransition() {
        return this.history[this.history.length - 1] || null;
    }

    // Reset FSA to initial state
    reset() {
        this.currentState = INITIAL_STATE;
        this.history = [];
        this.transitionCount = 0;
    }

    // Get FSA statistics
    getStatistics() {
        return {
            currentState: this.currentState,
            totalTransitions: this.transitionCount,
            isFinalState: this.isFinalState(),
            historyLength: this.history.length
        };
    }

    // Validate a sequence of actions
    validateSequence(actions) {
        const tempFSA = new FSAEngine();
        const results = [];

        for (let i = 0; i < actions.length; i++) {
            try {
                const result = tempFSA.transition(actions[i]);
                results.push({
                    step: i + 1,
                    action: actions[i],
                    success: true,
                    state: result.nextState
                });
            } catch (error) {
                results.push({
                    step: i + 1,
                    action: actions[i],
                    success: false,
                    error: error.message,
                    state: tempFSA.getCurrentState()
                });
                return {
                    valid: false,
                    results,
                    finalState: tempFSA.getCurrentState(),
                    isFinal: tempFSA.isFinalState()
                };
            }
        }

        return {
            valid: true,
            results,
            finalState: tempFSA.getCurrentState(),
            isFinal: tempFSA.isFinalState()
        };
    }

    // Export state for persistence
    exportState() {
        return {
            currentState: this.currentState,
            history: this.history,
            transitionCount: this.transitionCount
        };
    }

    // Import state from persistence
    importState(state) {
        this.currentState = state.currentState;
        this.history = state.history;
        this.transitionCount = state.transitionCount;
    }
}

// Order Manager - Manages multiple orders
export class OrderManager {
    constructor() {
        this.orders = new Map();
        this.orderCounter = 0;
    }

    // Create new order
    createOrder(customerName = 'Customer') {
        this.orderCounter++;
        const orderId = `ORD-${String(this.orderCounter).padStart(4, '0')}`;
        
        const order = {
            id: orderId,
            customerName,
            fsa: new FSAEngine(),
            createdAt: new Date().toISOString()
        };

        this.orders.set(orderId, order);
        return order;
    }

    // Get order by ID
    getOrder(orderId) {
        return this.orders.get(orderId);
    }

    // Get all orders
    getAllOrders() {
        return Array.from(this.orders.values());
    }

    // Execute action on specific order
    executeAction(orderId, action) {
        const order = this.getOrder(orderId);
        if (!order) {
            throw new Error(`Order ${orderId} not found`);
        }

        return order.fsa.transition(action);
    }

    // Delete order
    deleteOrder(orderId) {
        return this.orders.delete(orderId);
    }

    // Get statistics for all orders
    getStatistics() {
        const stats = {
            totalOrders: this.orders.size,
            byState: {}
        };

        this.orders.forEach(order => {
            const state = order.fsa.getCurrentState();
            stats.byState[state] = (stats.byState[state] || 0) + 1;
        });

        return stats;
    }
}
